// ═══════════════════════════════════════════════════════════════
// NEURAL LINK — app.js  |  Full Rewrite
// ═══════════════════════════════════════════════════════════════

// ── SVG ICON LIBRARY ────────────────────────────────────────────
const ICONS = {
  power: `<svg class="svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <polyline points="13,2 5,13 12,13 11,22 19,11 12,11" fill="#00f3ff" stroke="#00f3ff" stroke-width="0.5" stroke-linejoin="round"/>
  </svg>`,

  terminate: `<svg class="svg-icon svg-pink" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#ff0055" stroke-width="2" fill="rgba(255,0,85,0.1)"/>
    <line x1="8" y1="8" x2="16" y2="16" stroke="#ff0055" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="16" y1="8" x2="8" y2="16" stroke="#ff0055" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  crosshair: `<svg class="svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="7" stroke="#00f3ff" stroke-width="1.5" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="#00f3ff"/>
    <line x1="12" y1="2" x2="12" y2="5" stroke="#00f3ff" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="19" x2="12" y2="22" stroke="#00f3ff" stroke-width="2" stroke-linecap="round"/>
    <line x1="2" y1="12" x2="5" y2="12" stroke="#00f3ff" stroke-width="2" stroke-linecap="round"/>
    <line x1="19" y1="12" x2="22" y2="12" stroke="#00f3ff" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  restore: `<svg class="svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <polyline points="9,14 4,14 4,19" stroke="#00f3ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M20 9A9 9 0 0 0 4 14" stroke="#00f3ff" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`,

  pulse: `<svg class="svg-icon" width="22" height="14" viewBox="0 0 44 14" fill="none">
    <polyline points="0,7 8,7 11,1 14,13 17,4 20,10 23,7 44,7" stroke="#00f3ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,

  chevron: `<svg class="svg-icon svg-pink" width="20" height="16" viewBox="0 0 24 18" fill="none">
    <polyline points="3,2 12,8 21,2" stroke="#ff0055" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <polyline points="3,8 12,14 21,8" stroke="#ff0055" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <polyline points="3,14 12,20 21,14" stroke="#ff0055" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,

  radar: `<svg class="svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#00f3ff" stroke-width="1.5" fill="none" opacity="0.4"/>
    <circle cx="12" cy="12" r="5" stroke="#00f3ff" stroke-width="1.5" fill="none" opacity="0.6"/>
    <circle cx="12" cy="12" r="2" fill="#00f3ff"/>
    <line x1="12" y1="12" x2="19" y2="5" stroke="#00f3ff" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
  </svg>`,

  // Bounty item icons
  bolt:   `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><polyline points="13,2 5,13 12,13 11,22 19,11 12,11" fill="#00f3ff"/></svg>`,
  target: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#00f3ff" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="4" stroke="#00f3ff" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="1.5" fill="#00f3ff"/></svg>`,
  shield: `<svg class="svg-icon svg-pink" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6z" stroke="#ff0055" stroke-width="1.5" fill="rgba(255,0,85,0.1)"/></svg>`,
  ghost:  `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 6 5 10v10l2-2 2 2 2-2 2 2 2-2 2 2V10C19 6 16 3 12 3z" stroke="#00f3ff" stroke-width="1.5" fill="none"/><circle cx="9.5" cy="10" r="1" fill="#00f3ff"/><circle cx="14.5" cy="10" r="1" fill="#00f3ff"/></svg>`,
  dual:   `<svg class="svg-icon svg-pink" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="9" height="7" rx="1" stroke="#ff0055" stroke-width="1.5" fill="none"/><rect x="13" y="3" width="9" height="7" rx="1" stroke="#ff0055" stroke-width="1.5" fill="none"/><rect x="2" y="14" width="9" height="7" rx="1" stroke="#ff0055" stroke-width="1.5" fill="none"/><rect x="13" y="14" width="9" height="7" rx="1" stroke="#00f3ff" stroke-width="1.5" fill="none"/></svg>`,
  skull:  `<svg class="svg-icon svg-pink" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 4C8.5 4 6 6.5 6 10c0 2.5 1.5 4.5 3.5 5.5V18h5v-2.5C16.5 14.5 18 12.5 18 10c0-3.5-2.5-6-6-6z" stroke="#ff0055" stroke-width="1.5" fill="none"/><rect x="9" y="18" width="6" height="2" rx="0.5" stroke="#ff0055" stroke-width="1" fill="none"/><circle cx="9.5" cy="10" r="1.5" fill="#ff0055"/><circle cx="14.5" cy="10" r="1.5" fill="#ff0055"/></svg>`,
};

// ── SESSIONS (IST = UTC+5:30) ──────────────────────────────────
const SESSIONS = {
  london: { name: 'LONDON',   startH: 12, startM: 30, endH: 14, endM: 30 },
  ny:     { name: 'NEW YORK', startH: 17, startM: 30, endH: 20, endM: 0  },
};

// ── RANKS ──────────────────────────────────────────────────────
const RANKS = [
  { name: 'GLITCH-RUNNER',  xp: 0    },
  { name: 'CIPHER-GHOST',   xp: 60   },
  { name: 'NEON-HUNTER',    xp: 150  },
  { name: 'DATA-WRAITH',    xp: 300  },
  { name: 'NEURAL-BLADE',   xp: 600  },
  { name: 'CHROME-PHANTOM', xp: 1200 },
  { name: 'APEX-NETRUNNER', xp: 2500 },
];

// ── BOUNTIES ───────────────────────────────────────────────────
const BOUNTIES = [
  { id: 'b1', icon: 'bolt',   name: 'First Sync',    req: '1 min focused',  xpReq: 60,   special: null },
  { id: 'b2', icon: 'target', name: 'Full Session',   req: '60 mins in slot',xpReq: 3600, special: null },
  { id: 'b3', icon: 'shield', name: 'No Drift',       req: '0 breaches',     xpReq: 0,    special: 'nodrift' },
  { id: 'b4', icon: 'ghost',  name: 'Ghost Protocol', req: '30 mins clean',  xpReq: 0,    special: 'ghost30' },
  { id: 'b5', icon: 'dual',   name: 'Double Session', req: 'Both sessions',  xpReq: 0,    special: 'double' },
  { id: 'b6', icon: 'skull',  name: 'Iron Trader',    req: '3 day streak',   xpReq: 0,    special: 'streak3' },
];

// ── STATE ──────────────────────────────────────────────────────
const S = {
  uplinkActive:       false,
  focusSeconds:       0,     // increments every tick if !breach && !intelActive
  ghostSeconds:       0,     // resets on breach
  driftCount:         0,
  inBreach:           false,
  intelActive:        false,
  intelSecondsLeft:   0,
  sessionsCompleted:  [],
  claimedBounties:    [],
  announced:          {},
  xp:                 0,
  focusMinutes:       0,
  streak:             0,
  lastTradeDate:      null,
};

// ── PERSIST ────────────────────────────────────────────────────
function save() {
  try {
    localStorage.setItem('nl_v2', JSON.stringify({
      xp: S.xp, streak: S.streak,
      lastTradeDate: S.lastTradeDate,
      claimedBounties: S.claimedBounties,
    }));
  } catch (_) {}
}

function load() {
  try {
    const d = JSON.parse(localStorage.getItem('nl_v2') || '{}');
    S.xp              = d.xp             || 0;
    S.streak          = d.streak          || 0;
    S.lastTradeDate   = d.lastTradeDate   || null;
    S.claimedBounties = d.claimedBounties || [];
  } catch (_) {}
}

// ── GLOBAL TICK HANDLES ────────────────────────────────────────
window._NL_TICK  = null;
window._NL_INTEL = null;

// ── IST HELPERS ────────────────────────────────────────────────
function getIST() {
  const n = new Date();
  return new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 19800000);
}

function toMins(h, m) { return h * 60 + m; }

function hhmmss(d) {
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map(n => String(n).padStart(2, '0')).join(':');
}

function fmtSecs(s) {
  const m = Math.floor(Math.abs(s) / 60);
  const sec = Math.abs(s) % 60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function fmtMinsLabel(s) {
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}

// ── SESSION INFO ───────────────────────────────────────────────
function getSessionInfo(key) {
  const ist   = getIST();
  const now   = toMins(ist.getHours(), ist.getMinutes());
  const s     = SESSIONS[key];
  const start = toMins(s.startH, s.startM);
  const end   = toMins(s.endH,   s.endM);
  const total = end - start;

  if (now >= start && now < end) {
    return {
      status: 'active',
      elapsed:   now - start,
      remaining: end - now,
      total,
      totalSecs: total * 60,
      mid:       start + Math.floor(total / 2),
      warn15:    end - 15,
      nowMins:   now,
    };
  }
  if (now < start) return { status: 'upcoming', minsUntil: start - now };
  return { status: 'offline' };
}

// ── WEB AUDIO ──────────────────────────────────────────────────
let _ctx = null, _master = null, _ambiNodes = [];
let _audioOn = false;

function initCtx() {
  if (_ctx) return;
  _ctx = new (window.AudioContext || window.webkitAudioContext)();
  _master = _ctx.createGain();
  _master.gain.value = 0;
  _master.connect(_ctx.destination);
}

function buildAmbience() {
  killAmbience();
  const osc = (type, freq, detune = 0) => {
    const o = _ctx.createOscillator();
    o.type = type; o.frequency.value = freq;
    if (detune) o.detune.value = detune;
    return o;
  };
  const gain = (val) => { const g = _ctx.createGain(); g.gain.value = val; return g; };

  const bass = osc('sine', 48);
  const bassG = gain(0.28);
  const lfo = osc('sine', 0.25);
  const lfoG = gain(5);
  lfo.connect(lfoG); lfoG.connect(bass.frequency);
  bass.connect(bassG); bassG.connect(_master);

  const drone = osc('sawtooth', 80, 8);
  const droneG = gain(0.035);
  drone.connect(droneG); droneG.connect(_master);

  const buf = _ctx.createBuffer(1, _ctx.sampleRate * 2, _ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const noise = _ctx.createBufferSource();
  noise.buffer = buf; noise.loop = true;
  const bpf = _ctx.createBiquadFilter();
  bpf.type = 'bandpass'; bpf.frequency.value = 1100; bpf.Q.value = 0.9;
  const noiseG = gain(0.055);
  noise.connect(bpf); bpf.connect(noiseG); noiseG.connect(_master);

  [bass, lfo, drone, noise].forEach(n => n.start());
  _ambiNodes = [bass, bassG, lfo, lfoG, drone, droneG, noise, bpf, noiseG];
}

function killAmbience() {
  _ambiNodes.forEach(n => { try { n.stop?.(); n.disconnect?.(); } catch (_) {} });
  _ambiNodes = [];
}

function playBreachAlarm() {
  initCtx();
  if (_ctx.state === 'suspended') _ctx.resume();
  [880, 660, 440].forEach((freq, i) => {
    const o = _ctx.createOscillator();
    const g = _ctx.createGain();
    o.type = 'square'; o.frequency.value = freq;
    const t = _ctx.currentTime + i * 0.15;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.4, t + 0.05);
    g.gain.linearRampToValueAtTime(0, t + 0.25);
    o.connect(g); g.connect(_ctx.destination);
    o.start(t); o.stop(t + 0.3);
  });
}

function toggleAudio() {
  initCtx();
  if (_ctx.state === 'suspended') _ctx.resume();
  _audioOn = !_audioOn;
  const btn = document.getElementById('btn-audio');
  if (_audioOn) {
    buildAmbience();
    _master.gain.setTargetAtTime(0.6, _ctx.currentTime, 1.5);
    btn.innerHTML = ICONS.radar + '<span>AMBIENCE: ON</span>';
    btn.classList.add('on');
    log('Cyberpunk ambience stream active.', 'cyan');
  } else {
    _master.gain.setTargetAtTime(0, _ctx.currentTime, 1.5);
    setTimeout(killAmbience, 2000);
    btn.innerHTML = ICONS.radar + '<span>AMBIENCE: OFF</span>';
    btn.classList.remove('on');
    log('Ambience disengaged.', '');
  }
}

// ── SPEECH ─────────────────────────────────────────────────────
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85; u.pitch = 0.65; u.volume = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('uk'))
         || voices.find(v => v.lang.startsWith('en')) || voices[0];
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

// ── PUSH NOTIFS ────────────────────────────────────────────────
function pushNotif(title, body) {
  if (Notification.permission !== 'granted') return;
  navigator.serviceWorker?.ready.then(r =>
    r.showNotification(title, { body, icon: 'icon-192.png', tag: 'nl', renotify: true, vibrate: [200,100,200] })
  ).catch(() => new Notification(title, { body }));
}

function requestNotifPermission() {
  Notification.requestPermission().then(p => {
    if (p === 'granted') {
      document.getElementById('notif-banner').style.display = 'none';
      log('Push notifications enabled.', 'cyan');
    }
  });
}

// ── SW REGISTRATION ────────────────────────────────────────────
function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('./sw.js')
    .then(() => log('Service worker armed. Background sync active.', 'cyan'))
    .catch(e => log('SW: ' + e.message, 'warn'));
}

// ── TERMINAL LOG ───────────────────────────────────────────────
function log(msg, cls = '') {
  const body = document.getElementById('term-body');
  if (!body) return;
  const row = document.createElement('div');
  row.className = 'log-row';
  row.innerHTML = `<span class="log-t">${hhmmss(getIST())}</span><span class="log-m ${cls}">▸ ${msg}</span>`;
  body.appendChild(row);
  body.scrollTop = body.scrollHeight;
  while (body.children.length > 60) body.removeChild(body.firstChild);
}

// ── TOAST ──────────────────────────────────────────────────────
let _tt = null;
function toast(msg, pink = false) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast-show' + (pink ? ' toast-pink' : '');
  clearTimeout(_tt);
  _tt = setTimeout(() => { el.className = ''; }, 2800);
}

// ── RING ───────────────────────────────────────────────────────
function setRing(pct) {
  const v = Math.min(Math.max(pct, 0), 100);
  const offset = (2 * Math.PI * 90) * (1 - v / 100);
  const p = document.getElementById('ring-progress');
  const l = document.getElementById('sync-rate');
  if (p) p.style.strokeDashoffset = offset;
  if (l) l.textContent = Math.round(v) + '%';
}

// ── SESSION CARDS ──────────────────────────────────────────────
function refreshCards() {
  ['london','ny'].forEach(key => {
    const info  = getSessionInfo(key);
    const card  = document.getElementById('card-' + key);
    const badge = document.getElementById('badge-' + key);
    const cd    = document.getElementById('cd-' + key);
    if (!card) return;
    card.className = 'sess-card ' + info.status;
    badge.textContent = info.status === 'active'   ? 'LIVE'
                      : info.status === 'upcoming' ? 'UPCOMING'
                      : 'OFFLINE';
    cd.textContent = info.status === 'active'   ? fmtMinsLabel(info.remaining * 60) + ' LEFT'
                   : info.status === 'upcoming' ? 'IN ' + fmtMinsLabel(info.minsUntil * 60)
                   : '';
  });
}

// ── METRICS ────────────────────────────────────────────────────
function refreshMetrics() {
  const mins = Math.floor(S.focusSeconds / 60);
  const fm = document.getElementById('focus-mins-val');
  const dc = document.getElementById('drift-val');
  const fb = document.getElementById('focus-bar');
  const db = document.getElementById('drift-bar');
  if (fm) fm.textContent = mins;
  if (dc) dc.textContent = S.driftCount;
  if (fb) fb.style.width = Math.min((mins / 150) * 100, 100) + '%';
  if (db) db.style.width = Math.min((S.driftCount / 20) * 100, 100) + '%';
}

// ── RANK ───────────────────────────────────────────────────────
function getRank() { return RANKS.reduce((r, x) => S.xp >= x.xp ? x : r, RANKS[0]); }
function getNextRank() { return RANKS.find(r => r.xp > S.xp) || null; }

function refreshRank() {
  const cur  = getRank();
  const next = getNextRank();
  document.getElementById('rank-name').textContent = cur.name;
  document.getElementById('xp-val').textContent    = S.xp + ' XP';
  if (next) {
    document.getElementById('rank-next').textContent = `Next: ${next.name} @ ${next.xp} XP`;
    document.getElementById('xp-bar').style.width =
      Math.min(((S.xp - cur.xp) / (next.xp - cur.xp)) * 100, 100) + '%';
  } else {
    document.getElementById('rank-next').textContent = 'MAX RANK ACHIEVED';
    document.getElementById('xp-bar').style.width = '100%';
  }
}

// ── BOUNTIES ───────────────────────────────────────────────────
function checkBounties() {
  BOUNTIES.forEach(b => {
    if (S.claimedBounties.includes(b.id)) return;
    let ok = false;
    if (!b.special && S.focusSeconds >= b.xpReq) ok = true;
    if (b.special === 'nodrift'  && S.driftCount === 0 && S.focusSeconds >= 600) ok = true;
    if (b.special === 'ghost30'  && S.ghostSeconds >= 1800) ok = true;
    if (b.special === 'double'   && S.sessionsCompleted.length >= 2) ok = true;
    if (b.special === 'streak3'  && S.streak >= 3) ok = true;
    if (!ok) return;
    S.claimedBounties.push(b.id);
    S.xp += 25; save();
    renderBounties();
    log(`BOUNTY UNLOCKED: ${b.name} +25 XP`, 'cyan');
    speak(`Bounty unlocked. ${b.name}. Twenty five XP awarded.`);
    toast('BOUNTY: ' + b.name + ' +25XP');
  });
}

function renderBounties() {
  const grid = document.getElementById('bounty-grid');
  if (!grid) return;
  grid.innerHTML = '';
  BOUNTIES.forEach(b => {
    const claimed = S.claimedBounties.includes(b.id);
    const div = document.createElement('div');
    div.className = 'bounty-item' + (claimed ? ' claimed' : '');
    div.innerHTML =
      `<span class="b-icon">${ICONS[b.icon]||''}</span>` +
      `<span class="b-text"><span class="b-name">${b.name}</span><span class="b-req">${b.req}</span></span>` +
      `<span class="b-check">${claimed ? '✓' : ''}</span>`;
    grid.appendChild(div);
  });
}

// ── ANNOUNCEMENTS ──────────────────────────────────────────────
function checkAnnouncements(info, key) {
  if (info.status !== 'active') return;
  const s = SESSIONS[key];
  if (!S.announced[key+'_start']) {
    S.announced[key+'_start'] = true;
    speak(`${s.name} session live. Trade with precision.`);
    pushNotif(`${s.name} LIVE`, 'Focus protocol engaged.');
    log(`${s.name} SESSION STARTED`, 'cyan');
    toast(`${s.name} SESSION LIVE`);
  }
  if (!S.announced[key+'_mid'] && info.nowMins >= info.mid) {
    S.announced[key+'_mid'] = true;
    speak(`Midpoint. ${s.name} half complete. Assess and hold.`);
    log(`${s.name} MIDPOINT — Assess your positions.`, 'warn');
  }
  if (!S.announced[key+'_w15'] && info.nowMins >= info.warn15) {
    S.announced[key+'_w15'] = true;
    speak(`Warning. Fifteen minutes left in ${s.name}.`);
    log(`${s.name} — 15 MINUTE WARNING`, 'pink');
    toast('15 MIN WARNING', true);
  }
}

// ═══════════════════════════════════════════════════════════════
//  SYNC ENGINE — MASTER TICK
//  Fires every 1000ms via window._NL_TICK
//
//  syncPct = (focusSeconds / totalSessionSeconds) * 100
//  – During a session:  totalSessionSeconds = session duration
//  – Outside sessions:  totalSessionSeconds = 3600 (1hr window)
//  focusSeconds increments ONLY when:
//    uplinkActive && !inBreach && !intelActive
// ═══════════════════════════════════════════════════════════════
function masterTick() {
  if (!S.uplinkActive) return;

  // Clock
  document.getElementById('clock').textContent = hhmmss(getIST());

  // Which session is live?
  const lI = getSessionInfo('london');
  const nI = getSessionInfo('ny');
  const activeInfo = lI.status === 'active' ? lI
                   : nI.status === 'active' ? nI
                   : null;

  // ── Increment focusSeconds ──────────────────────────────────
  if (!S.inBreach && !S.intelActive) {
    S.focusSeconds++;
    S.ghostSeconds++;
    // XP: 1 per focus minute, only during a live session
    if (activeInfo && S.focusSeconds % 60 === 0) {
      S.focusMinutes++;
      S.xp++;
      save();
      checkBounties();
      log(`Focus: ${S.focusMinutes}m | XP: ${S.xp}`, '');
    }
  } else if (S.inBreach) {
    S.ghostSeconds = 0;
  }

  // ── Sync % calculation ──────────────────────────────────────
  let syncPct = 0;
  let timerLabel = '--:--';

  if (activeInfo) {
    // Inside session: progress = focusSeconds / totalSessionSeconds
    syncPct    = (S.focusSeconds / activeInfo.totalSecs) * 100;
    timerLabel = fmtMinsLabel(activeInfo.remaining * 60) + ' LEFT';
    if (S.inBreach) syncPct = Math.max(syncPct - 8, 0);
    checkAnnouncements(lI, 'london');
    checkAnnouncements(nI, 'ny');
  } else {
    // Outside session: focusSeconds / 3600
    syncPct    = (S.focusSeconds / 3600) * 100;
    timerLabel = fmtSecs(S.focusSeconds) + ' UPLINK';
    if (S.inBreach) syncPct = Math.max(syncPct - 5, 0);
  }

  setRing(Math.min(syncPct, 100));
  document.getElementById('session-timer').textContent = timerLabel;

  refreshCards();
  refreshMetrics();
  refreshRank();
}

// ═══════════════════════════════════════════════════════════════
//  UPLINK TOGGLE
// ═══════════════════════════════════════════════════════════════
function toggleUplink() {
  S.uplinkActive = !S.uplinkActive;

  if (S.uplinkActive) {
    // Reset session state
    S.focusSeconds = 0; S.ghostSeconds = 0; S.driftCount = 0;
    S.inBreach = false; S.intelActive = false;
    S.sessionsCompleted = []; S.announced = {};

    clearInterval(window._NL_INTEL); window._NL_INTEL = null;

    document.getElementById('btn-uplink').innerHTML = ICONS.terminate + '<span>TERMINATE UPLINK</span>';
    document.getElementById('btn-uplink').classList.add('active');
    document.getElementById('uplink-dot').classList.add('active');
    document.getElementById('uplink-status').textContent = 'UPLINK ACTIVE';
    document.getElementById('intel-zone').style.display = 'flex';

    log('Uplink initialized. Neural sync engaged.', 'cyan');
    speak('Neural link established. Focus protocol active. Watch the charts.');
    toast('UPLINK ONLINE');

    // Start master tick immediately
    clearInterval(window._NL_TICK);
    window._NL_TICK = setInterval(masterTick, 1000);
    masterTick(); // fire on frame 0 so ring moves instantly

  } else {
    clearInterval(window._NL_TICK); window._NL_TICK = null;
    clearInterval(window._NL_INTEL); window._NL_INTEL = null;
    S.inBreach = false; S.intelActive = false;

    document.getElementById('btn-uplink').innerHTML = ICONS.power + '<span>START UPLINK</span>';
    document.getElementById('btn-uplink').classList.remove('active');
    document.getElementById('uplink-dot').classList.remove('active');
    document.getElementById('uplink-status').textContent = 'UPLINK INACTIVE';
    document.getElementById('intel-zone').style.display = 'none';

    setBreach(false);
    resetIntelUI();
    setRing(0);
    document.getElementById('session-timer').textContent = '--:--';
    document.getElementById('clock').textContent = hhmmss(getIST());

    log(`Uplink terminated. ${Math.floor(S.focusSeconds/60)}m focused. Archived.`, 'pink');
    speak('Uplink severed. Session archived. Stand down.');
    toast('UPLINK OFFLINE', true);
  }
}

// ═══════════════════════════════════════════════════════════════
//  COMM-LINK PROTOCOL — EXTERIOR INTEL
// ═══════════════════════════════════════════════════════════════
const INTEL_SECS = 180;

function startExteriorIntel() {
  if (!S.uplinkActive || S.intelActive) return;
  S.intelActive = true;
  S.intelSecondsLeft = INTEL_SECS;
  S.inBreach = false;
  setBreach(false);

  document.getElementById('btn-intel').style.display       = 'none';
  document.getElementById('intel-active-row').style.display = 'flex';
  document.getElementById('intel-countdown').textContent    = fmtSecs(INTEL_SECS);

  log(`EXTERIOR INTEL initiated. ${INTEL_SECS}s window open.`, 'warn');
  speak('Exterior intel window open. You have three minutes. Return before timeout.');
  toast('INTEL WINDOW: 3:00');

  clearInterval(window._NL_INTEL);
  window._NL_INTEL = setInterval(() => {
    S.intelSecondsLeft--;
    const el = document.getElementById('intel-countdown');
    if (el) el.textContent = fmtSecs(S.intelSecondsLeft);

    if (S.intelSecondsLeft <= 10 && S.intelSecondsLeft > 0) {
      el.style.color = '#ff0055'; // warn color
    }

    if (S.intelSecondsLeft <= 0) {
      clearInterval(window._NL_INTEL); window._NL_INTEL = null;
      S.intelActive = false;
      triggerCriticalBreach();
    }
  }, 1000);
}

function restoreLink() {
  if (!S.intelActive) return;
  clearInterval(window._NL_INTEL); window._NL_INTEL = null;
  S.intelActive = false;
  resetIntelUI();
  log('Comm-link restored. Sync resuming.', 'cyan');
  speak('Comm-link restored. Sync rate resuming. Welcome back.');
  toast('LINK RESTORED');
}

function resetIntelUI() {
  const btn = document.getElementById('btn-intel');
  const row = document.getElementById('intel-active-row');
  const cd  = document.getElementById('intel-countdown');
  if (btn) btn.style.display = 'flex';
  if (row) row.style.display = 'none';
  if (cd) { cd.textContent = ''; cd.style.color = ''; }
}

function triggerCriticalBreach() {
  S.driftCount++; S.ghostSeconds = 0;
  document.getElementById('breach-overlay').style.display = 'flex';
  document.getElementById('breach-overlay').classList.add('breach-alarm');
  resetIntelUI();
  playBreachAlarm();
  speak('Critical breach. Comm-link timeout. Sync rate degrading.');
  pushNotif('CRITICAL BREACH', 'Intel window expired. Return now.');
  log('CRITICAL BREACH — Intel window expired. Sync penalised.', 'pink');
  toast('CRITICAL BREACH', true);
  setTimeout(() => {
    document.getElementById('breach-overlay').style.display = 'none';
    document.getElementById('breach-overlay').classList.remove('breach-alarm');
  }, 5000);
}

// ── VISIBILITY API ─────────────────────────────────────────────
function setBreach(active) {
  S.inBreach = active;
  const o = document.getElementById('breach-overlay');
  if (!o) return;
  if (active) { o.style.display = 'flex'; o.classList.remove('breach-alarm'); }
  else        { o.style.display = 'none'; }
}

let _hiddenAt = null;
document.addEventListener('visibilitychange', () => {
  if (!S.uplinkActive) return;
  if (document.visibilityState === 'hidden') {
    _hiddenAt = Date.now();
    setTimeout(() => {
      if (document.visibilityState === 'hidden' && S.uplinkActive && !S.intelActive) {
        setBreach(true);
        S.driftCount++; S.ghostSeconds = 0;
        log('DRIFT DETECTED — tab left without Intel window.', 'pink');
        pushNotif('DRIFT DETECTED', 'Return to NEURAL LINK. Sync degrading.');
      }
    }, 5000);
  } else {
    const away = _hiddenAt ? Math.round((Date.now() - _hiddenAt) / 1000) : 0;
    _hiddenAt = null;
    if (S.inBreach) {
      setBreach(false);
      log(`Uplink reestablished after ${away}s.`, 'warn');
      speak('Uplink restored. Sync recovering.');
      toast('DRIFT ENDED', true);
    }
  }
});

// ── EXPOSE GLOBALS ─────────────────────────────────────────────
window.toggleUplink           = toggleUplink;
window.toggleAudio            = toggleAudio;
window.startExteriorIntel     = startExteriorIntel;
window.restoreLink            = restoreLink;
window.requestNotifPermission = requestNotifPermission;

// ═══════════════════════════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════════════════════════
(function boot() {
  load();
  registerSW();

  // Notification banner
  if (!('Notification' in window) || Notification.permission === 'granted') {
    document.getElementById('notif-banner').style.display = 'none';
  }

  renderBounties();
  refreshRank();
  refreshMetrics();
  refreshCards();

  // Initial clock
  document.getElementById('clock').textContent = hhmmss(getIST());

  // Passive tick: clock + session cards even before uplink
  setInterval(() => {
    document.getElementById('clock').textContent = hhmmss(getIST());
    refreshCards();
  }, 1000);

  // Terminal boot messages
  setTimeout(() => {
    log('All systems nominal. Awaiting uplink command.', '');
    log('London 12:30–14:30 IST  |  New York 17:30–20:00 IST', 'cyan');
    log('Press START UPLINK to engage sync engine.', '');
  }, 400);

  // AudioContext unlock on mobile
  const unlock = () => { if (_ctx && _ctx.state === 'suspended') _ctx.resume(); };
  document.addEventListener('touchstart', unlock, { once: true });
  document.addEventListener('click', unlock, { once: true });
})();
