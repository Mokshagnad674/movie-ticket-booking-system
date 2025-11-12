
// Simple in-memory seat lock manager with expiry
const DEFAULT_TTL_MS = 10 * 60 * 1000; // 10 minutes

class SeatLockManager {
  constructor() {
    this.locks = new Map(); // key: showtimeId -> Map(key=row-col -> { by, expiresAt })
  }

  _getShowtimeMap(showtimeId) {
    if (!this.locks.has(showtimeId)) this.locks.set(showtimeId, new Map());
    return this.locks.get(showtimeId);
  }

  lock(showtimeId, seatKey, by, ttlMs = DEFAULT_TTL_MS) {
    const m = this._getShowtimeMap(showtimeId);
    const existing = m.get(seatKey);
    const now = Date.now();
    if (existing && existing.expiresAt > now && existing.by !== by) {
      return { ok: false, reason: 'locked' };
    }
    m.set(seatKey, { by, expiresAt: now + ttlMs });
    return { ok: true };
  }

  unlock(showtimeId, seatKey, by) {
    const m = this._getShowtimeMap(showtimeId);
    const existing = m.get(seatKey);
    if (existing && existing.by === by) {
      m.delete(seatKey);
      return { ok: true };
    }
    return { ok: false };
  }

  purgeExpired() {
    const now = Date.now();
    for (const [showtimeId, m] of this.locks) {
      for (const [seatKey, meta] of m) {
        if (meta.expiresAt <= now) m.delete(seatKey);
      }
    }
  }

  snapshot(showtimeId) {
    this.purgeExpired();
    const m = this._getShowtimeMap(showtimeId);
    const out = {};
    for (const [k, v] of m) out[k] = { by: v.by, expiresAt: v.expiresAt };
    return out;
  }
}

module.exports = new SeatLockManager();
