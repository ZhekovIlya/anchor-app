// ========================
// SERVER STORE
// ========================
// Node-only (no DOM). One small key-value interface, two implementations:
//   createMemoryStore() — tests and local dev (data lives in the process)
//   createRedisStore()  — Upstash Redis over its REST API (production)
//
// Interface (all async):
//   getDoc(key)                     → { rev, doc } | null   versioned JSON document
//   casDoc(key, expectedRev, doc)   → boolean               write only if rev is unchanged (rev + 1)
//   getJSON(key) / setJSON(key, value, { ttlSeconds })      plain JSON values
//   replaceJSON(key, value)         → boolean               only if the key still exists, TTL kept
//   takeJSON(key)                   → value | null          read and delete atomically
//   del(key) / incr(key, ttlSeconds) / sadd / srem / smembers

const CAS_SCRIPT = `
local current = redis.call('HGET', KEYS[1], 'rev')
if (current or '0') ~= ARGV[1] then return 0 end
redis.call('HSET', KEYS[1], 'rev', ARGV[2], 'doc', ARGV[3])
return 1`;

const INCR_SCRIPT = `
local n = redis.call('INCR', KEYS[1])
if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return n`;

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

/**
 * In-memory store. Values are cloned on the way in and out, like a real
 * serialized store, so tests can't accidentally share object references.
 * @param {Object} [options]
 * @param {Function} [options.now] - clock for TTLs (ms)
 */
export function createMemoryStore({ now = Date.now } = {}) {
  const docs = new Map();     // key → { rev, doc }
  const values = new Map();   // key → { value, expiresAt }
  const sets = new Map();     // key → Set

  function live(key) {
    const entry = values.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt <= now()) {
      values.delete(key);
      return null;
    }
    return entry;
  }

  return {
    async getDoc(key) {
      const entry = docs.get(key);
      return entry ? { rev: entry.rev, doc: clone(entry.doc) } : null;
    },
    async casDoc(key, expectedRev, doc) {
      const currentRev = docs.has(key) ? docs.get(key).rev : 0;
      if (currentRev !== expectedRev) return false;
      docs.set(key, { rev: currentRev + 1, doc: clone(doc) });
      return true;
    },
    async getJSON(key) {
      const entry = live(key);
      return entry ? clone(entry.value) : null;
    },
    async setJSON(key, value, { ttlSeconds } = {}) {
      values.set(key, { value: clone(value), expiresAt: ttlSeconds ? now() + ttlSeconds * 1000 : 0 });
    },
    async replaceJSON(key, value) {
      const entry = live(key);
      if (!entry) return false;
      values.set(key, { value: clone(value), expiresAt: entry.expiresAt });
      return true;
    },
    async takeJSON(key) {
      const entry = live(key);
      values.delete(key);
      return entry ? clone(entry.value) : null;
    },
    async del(key) {
      docs.delete(key);
      values.delete(key);
      sets.delete(key);
    },
    async incr(key, ttlSeconds) {
      const entry = live(key);
      const next = (entry ? entry.value : 0) + 1;
      values.set(key, { value: next, expiresAt: entry ? entry.expiresAt : now() + ttlSeconds * 1000 });
      return next;
    },
    async sadd(key, member) {
      if (!sets.has(key)) sets.set(key, new Set());
      sets.get(key).add(String(member));
    },
    async srem(key, member) {
      if (sets.has(key)) sets.get(key).delete(String(member));
    },
    async smembers(key) {
      return [...(sets.get(key) || [])];
    },
  };
}

/**
 * Upstash Redis store over the REST API (one HTTP request per command).
 * @param {Object} options
 * @param {string} options.url - REST URL (KV_REST_API_URL / UPSTASH_REDIS_REST_URL)
 * @param {string} options.token - REST token
 * @param {Function} [options.fetch] - injectable fetch (tests)
 */
export function createRedisStore({ url, token, fetch: fetchImpl = globalThis.fetch }) {
  const endpoint = url.replace(/\/+$/, '');

  async function command(...args) {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(args.map(String)),
    });
    let payload;
    try {
      payload = await response.json();
    } catch (e) {
      throw new Error(`Redis ${args[0]} failed: HTTP ${response.status}`);
    }
    if (!response.ok || payload.error) {
      throw new Error(`Redis ${args[0]} failed: ${payload.error || `HTTP ${response.status}`}`);
    }
    return payload.result;
  }

  const parse = (raw) => (raw === null || raw === undefined ? null : JSON.parse(raw));

  return {
    async getDoc(key) {
      const [rev, doc] = await command('HMGET', key, 'rev', 'doc');
      return rev === null || doc === null ? null : { rev: Number(rev), doc: JSON.parse(doc) };
    },
    async casDoc(key, expectedRev, doc) {
      const result = await command('EVAL', CAS_SCRIPT, 1, key, expectedRev, expectedRev + 1, JSON.stringify(doc));
      return Number(result) === 1;
    },
    async getJSON(key) {
      return parse(await command('GET', key));
    },
    async setJSON(key, value, { ttlSeconds } = {}) {
      const args = ['SET', key, JSON.stringify(value)];
      if (ttlSeconds) args.push('EX', ttlSeconds);
      await command(...args);
    },
    async replaceJSON(key, value) {
      return (await command('SET', key, JSON.stringify(value), 'XX', 'KEEPTTL')) === 'OK';
    },
    async takeJSON(key) {
      return parse(await command('GETDEL', key));
    },
    async del(key) {
      await command('DEL', key);
    },
    async incr(key, ttlSeconds) {
      return Number(await command('EVAL', INCR_SCRIPT, 1, key, ttlSeconds));
    },
    async sadd(key, member) {
      await command('SADD', key, member);
    },
    async srem(key, member) {
      await command('SREM', key, member);
    },
    async smembers(key) {
      return (await command('SMEMBERS', key)) || [];
    },
  };
}

/**
 * Optimistic read-modify-write on a versioned doc.
 * `mutate` receives a fresh copy of the current doc (or null) and returns the
 * next doc, or undefined to leave it untouched. Retried on concurrent writes.
 * @returns {Promise<{ doc: Object|null, written: boolean }>}
 */
export async function updateDoc(store, key, mutate, { retries = 6 } = {}) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const current = await store.getDoc(key);
    const rev = current ? current.rev : 0;
    const next = await mutate(current ? current.doc : null);
    if (next === undefined) return { doc: current ? current.doc : null, written: false };
    if (await store.casDoc(key, rev, next)) return { doc: next, written: true };
  }
  throw new Error(`Too many concurrent updates for ${key}`);
}
