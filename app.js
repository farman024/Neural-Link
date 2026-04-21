// ═══════════════════════════════════════════════════════
// NEURAL LINK — app.js
// ═══════════════════════════════════════════════════════

'use strict';

// ── SESSIONS (IST = UTC+5:30) ──
const SESSIONS = {
  london: { name: 'LONDON', startH: 12, startM: 30, endH: 14, endM: 30 },
  ny:     { name: 'NEW YORK', startH: 17, startM: 30, endH: 20, endM: 0  }
};

// ── RANK TABLE ──
const RANKS = [
  { name: 'GLITCH-RUNNER',   xp: 0   },
  { name: 'CIPHER-GHOST',    xp: 60  },
  { name: 'NEON-HUNTER',     xp: 150 },
  { name: 'DATA-WRAITH',     xp: 300 },
  { name: 'NEURAL-BLADE',    xp: 600 },
  { name: 'CHROME-PHANTOM',  xp: 1200},
  { name: 'APEX-NETRUNNER',  xp: 2500}
];

// ── BOUNTIES ──
const BOUNTIES = [
  { id: 'b1', icon: 'b1', name: 'First Sync',     req: '1 min focused',   xpReq: 1  },
  { id: 'b2', icon: 'b2', name: 'Full Session',   req: '60 mins in slot', xpReq: 60 },
  { id: 'b3', icon: 'b3', name: 'No Drift',       req: '0 tab switches',  xpReq: 0, special: 'nodrift' },
  { id: 'b4', icon: 'b4', name: 'Ghost Protocol', req: '30 mins no drift',xpReq: 0, special: 'ghost30' },
  { id: 'b5', icon: 'b5', name: 'Double Session', req: 'Both sessions',   xpReq: 0, special: 'double' },
  { id: 'b6', icon: 'b6', name: 'Iron Trader',    req: '3 days streak',   xpReq: 0, special: 'streak3' },
];

// ── SVG ICONS (inline cyberpunk, neon glow) ──
const SVG_ICONS = {
  // Lightning bolt — Start Uplink button
  power: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:8px;filter:drop-shadow(0 0 5px #00f3ff)">
    <polygon points="13,2 4,14 12,14 11,22 20,10 12,10" fill="#00f3ff" stroke="#00f3ff" stroke-width="1" stroke-linejoin="round"/>
  </svg>`,

  // Stop/terminate — active uplink
  terminate: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:8px;filter:drop-shadow(0 0 5px #ff0055)">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#ff0055" opacity="0.9"/>
    <line x1="9" y1="9" x2="15" y2="15" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="15" y1="9" x2="9" y2="15" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // Radar — audio/ambience button
  radar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:8px;filter:drop-shadow(0 0 5px #00f3ff)">
    <circle cx="12" cy="12" r="2" fill="#00f3ff"/>
    <path d="M12 12 L20 4" stroke="#00f3ff" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="12" cy="12" r="5" stroke="#00f3ff" stroke-width="1" opacity="0.5" fill="none"/>
    <circle cx="12" cy="12" r="9" stroke="#00f3ff" stroke-width="1" opacity="0.3" fill="none"/>
    <circle cx="12" cy="12" r="1" fill="#ff0055" style="filter:drop-shadow(0 0 3px #ff0055)"/>
  </svg>`,

  // Military chevron — rank
  chevron: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;filter:drop-shadow(0 0 5px #ff0055)">
    <polyline points="4,8 12,16 20,8" stroke="#ff0055" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <polyline points="4,13 12,21 20,13" stroke="#ff0055" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.5"/>
  </svg>`,

  // Pulse/brain wave — sync
  pulse: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;filter:drop-shadow(0 0 5px #00f3ff)">
    <polyline points="2,12 6,12 8,5 10,19 12,10 14,14 16,12 22,12" stroke="#00f3ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,

  // Bounty icons per item (inline small SVGs)
  b1: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 0 4px #00f3ff)"><polygon points="13,2 4,14 12,14 11,22 20,10 12,10" fill="#00f3ff"/></svg>`,
  b2: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 0 4px #00f3ff)"><circle cx="12" cy="12" r="9" stroke="#00f3ff" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" fill="#00f3ff"/></svg>`,
  b3: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 0 4px #ff0055)"><path d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z" fill="#ff0055"/></svg>`,
  b4: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 0 4px #00f3ff)"><circle cx="12" cy="8" r="4" stroke="#00f3ff" stroke-width="2" fill="none"/><path d="M4 20 Q12 14 20 20" stroke="#00f3ff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  b5: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 0 4px #ff0055)"><rect x="3" y="3" width="8" height="8" rx="1" fill="none" stroke="#ff0055" stroke-width="2"/><rect x="13" y="3" width="8" height="8" rx="1" fill="none" stroke="#ff0055" stroke-width="2"/><rect x="3" y="13" width="8" height="8" rx="1" fill="none" stroke="#ff0055" stroke-width="2"/><rect x="13" y="13" width="8" height="8" rx="1" fill="none" stroke="#00f3ff" stroke-width="2"/></svg>`,
  b6: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 0 4px #ff0055)"><path d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 15 L7 18 L9 12 L4 8 L10 8 Z" fill="none" stroke="#ff0055" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="11" r="2" fill="#ff0055"/></svg>`,
};

// ── STATE ──
let state = {
  uplinkActive: false,
  audioOn: false,
  xp: 0,
  focusMinutes: 0,
  driftCount: 0,
  sessionsCompleted: [],
  claimedBounties: [],
  streak: 0,
  lastTradeDate: null,
  ghostMinutes: 0,  // continuous minutes without drift
};

// Load persisted state
function loadState() {
  try {
    const saved = localStorage.getItem('neural_link_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.xp = parsed.xp || 0;
      state.streak = parsed.streak || 0;
      state.lastTradeDate = parsed.lastTradeDate || null;
      state.claimedBounties = parsed.claimedBounties || [];
    }
  } catch(e) {}
}

function saveState() {
  try {
    localStorage.setItem('neural_link_state', JSON.stringify({
      xp: state.xp,
      streak: state.streak,
      lastTradeDate: state.lastTradeDate,
      claimedBounties: state.claimedBounties,
    }));
  } catch(e) {}
}

// ── WEB AUDIO ──
let audioCtx = null;
let masterGain = null;
let audioNodes = [];

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);
}

function buildAmbience() {
  if (!audioCtx) return;
  stopAmbience();

  // Layer 1: Deep bass hum (50Hz sine)
  const bassOsc = audioCtx.createOscillator();
  const bassGain = audioCtx.createGain();
  bassOsc.type = 'sine';
  bassOsc.frequency.setValueAtTime(48, audioCtx.currentTime);
  bassGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
  bassOsc.connect(bassGain);
  bassGain.connect(masterGain);
  bassOsc.start();
  audioNodes.push(bassOsc, bassGain);

  // Layer 2: Mid drone (80Hz + slight detune for movement)
  const droneOsc = audioCtx.createOscillator();
  const droneGain = audioCtx.createGain();
  droneOsc.type = 'sawtooth';
  droneOsc.frequency.setValueAtTime(80, audioCtx.currentTime);
  droneOsc.detune.setValueAtTime(7, audioCtx.currentTime);
  droneGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  droneOsc.connect(droneGain);
  droneGain.connect(masterGain);
  droneOsc.start();
  audioNodes.push(droneOsc, droneGain);

  // Layer 3: High shimmer (220Hz square, very quiet)
  const shimmerOsc = audioCtx.createOscillator();
  const shimmerGain = audioCtx.createGain();
  shimmerOsc.type = 'square';
  shimmerOsc.frequency.setValueAtTime(220, audioCtx.currentTime);
  shimmerGain.gain.setValueAtTime(0.008, audioCtx.currentTime);
  shimmerOsc.connect(shimmerGain);
  shimmerGain.connect(masterGain);
  shimmerOsc.start();
  audioNodes.push(shimmerOsc, shimmerGain);

  // Layer 4: Rain noise (filtered white noise)
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const bpf = audioCtx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.setValueAtTime(1200, audioCtx.currentTime);
  bpf.Q.setValueAtTime(0.8, audioCtx.currentTime);

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.06, audioCtx.currentTime);

  source.connect(bpf);
  bpf.connect(noiseGain);
  noiseGain.connect(masterGain);
  source.start();
  audioNodes.push(source, noiseGain, bpf);

  // Layer 5: LFO for bass tremolo
  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.3, audioCtx.currentTime);
  lfoGain.gain.setValueAtTime(6, audioCtx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(bassOsc.frequency);
  lfo.start();
  audioNodes.push(lfo, lfoGain);
}

function stopAmbience() {
  audioNodes.forEach(n => {
    try { n.stop?.(); } catch(e) {}
    try { n.disconnect?.(); } catch(e) {}
  });
  audioNodes = [];
}

function toggleAudio() {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  state.audioOn = !state.audioOn;
  const btn = document.getElementById('btn-audio');

  if (state.audioOn) {
    buildAmbience();
    masterGain.gain.setTargetAtTime(0.6, audioCtx.currentTime, 1.5);
    btn.innerHTML = SVG_ICONS.radar + ' AMBIENCE: ON';
    btn.classList.add('on');
    log('Cyberpunk ambience activated.', 'cyan');
  } else {
    masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 1.5);
    setTimeout(() => stopAmbience(), 2000);
    btn.innerHTML = SVG_ICONS.radar + ' AMBIENCE: OFF';
    btn.classList.remove('on');
    log('Ambience disengaged.', '');
  }
}

// ── SPEECH SYNTHESIS ──
function speak(text, rate = 0.85, pitch = 0.7) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = 0.9;
  // Try to use a deeper/robotic voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.toLowerCase().includes('english') && v.name.toLowerCase().includes('uk')
  ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
  if (preferred) utter.voice = preferred;
  window.speechSynthesis.speak(utter);
}

// ── SERVICE WORKER ──
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        log('Service Worker registered. Background sync active.', 'cyan');
        // Keep SW alive during session
        setInterval(() => {
          if (state.uplinkActive && reg.active) {
            reg.active.postMessage({ type: 'KEEPALIVE' });
          }
        }, 20000);
      })
      .catch(e => log('SW registration failed: ' + e.message, 'warn'));
  }
}

// ── NOTIFICATIONS ──
function requestNotifPermission() {
  if (!('Notification' in window)) return;
  Notification.requestPermission().then(perm => {
    const banner = document.getElementById('notif-banner');
    if (perm === 'granted') {
      banner.style.display = 'none';
      log('Push notifications ENABLED.', 'cyan');
      showToast('ALERTS ENABLED');
    } else {
      log('Notification permission denied.', 'warn');
    }
  });
}

function sendNotification(title, body) {
  if (Notification.permission === 'granted' && document.visibilityState === 'hidden') {
    try {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, {
          body,
          icon: 'icon-192.png',
          badge: 'icon-192.png',
          tag: 'neural-link-alert',
          renotify: true,
          vibrate: [200, 100, 200],
        });
      });
    } catch(e) {
      new Notification(title, { body });
    }
  }
}

// ── TIME HELPERS ──
function getISTNow() {
  const now = new Date();
  // IST = UTC + 5:30
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + 19800000);
}

function toMins(h, m) { return h * 60 + m; }

function getSessionState(key) {
  const ist = getISTNow();
  const nowMins = toMins(ist.getHours(), ist.getMinutes());
  const s = SESSIONS[key];
  const startMins = toMins(s.startH, s.startM);
  const endMins = toMins(s.endH, s.endM);
  const midMins = Math.floor((startMins + endMins) / 2);
  const warn15Mins = endMins - 15;

  if (nowMins >= startMins && nowMins < endMins) {
    return {
      status: 'active',
      elapsed: nowMins - startMins,
      remaining: endMins - nowMins,
      total: endMins - startMins,
      mid: midMins,
      warn15: warn15Mins,
      nowMins
    };
  } else if (nowMins < startMins) {
    return { status: 'upcoming', minsUntil: startMins - nowMins };
  } else {
    return { status: 'offline' };
  }
}

function fmtMins(m) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (h > 0) return `${h}h ${min}m`;
  return `${min}m`;
}

function fmtTimeHMS(date) {
  return date.toTimeString().split(' ')[0];
}

// ── TERMINAL LOG ──
function log(msg, cls = '') {
  const body = document.getElementById('terminal-body');
  const ist = getISTNow();
  const t = fmtTimeHMS(ist);
  const line = document.createElement('div');
  line.className = 'log-line';
  line.innerHTML = `<span class="log-time">${t}</span><span class="log-msg ${cls}">▸ ${msg}</span>`;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
  // Keep max 50 lines
  while (body.children.length > 50) body.removeChild(body.firstChild);
}

// ── TOAST ──
function showToast(msg, pink = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show' + (pink ? ' pink-toast' : '');
  setTimeout(() => { t.className = ''; }, 2500);
}

// ── UPLINK TOGGLE ──
// These are on window so they can never be garbage-collected or shadowed
window._uplinkInterval = null;
window._sessionMinuteTimer = null;
window._uplinkStartTime = null;   // ms timestamp when uplink went live
window._uplinkSeconds = 0;        // raw elapsed seconds since uplink start

function toggleUplink() {
  state.uplinkActive = !state.uplinkActive;
  const btn = document.getElementById('btn-uplink');
  const dot = document.getElementById('uplink-dot');
  const status = document.getElementById('uplink-status');

  if (state.uplinkActive) {
    btn.innerHTML = SVG_ICONS.terminate + ' TERMINATE UPLINK';
    btn.classList.add('active');
    dot.classList.add('active');
    status.textContent = 'UPLINK ACTIVE';
    log('Uplink initialized. Neural sync engaged.', 'cyan');
    speak('Neural link established. Focus protocol active. Watch the charts, trader.');
    showToast('UPLINK ONLINE');

    // Reset all session counters
    state.focusMinutes = 0;
    state.driftCount = 0;
    state.sessionsCompleted = [];
    state.ghostMinutes = 0;

    // Sync engine — record exact start time
    window._uplinkStartTime = Date.now();
    window._uplinkSeconds = 0;

    startFocusTracking();
  } else {
    btn.innerHTML = SVG_ICONS.power + ' START UPLINK';
    btn.classList.remove('active');
    dot.classList.remove('active');
    status.textContent = 'UPLINK INACTIVE';
    log(`Uplink terminated after ${Math.floor(window._uplinkSeconds / 60)}m ${window._uplinkSeconds % 60}s. Session archived.`, 'pink');
    speak('Uplink severed. Session archived. Stand down, netrunner.');
    showToast('UPLINK OFFLINE', true);

    stopFocusTracking();
    // Reset ring display but keep XP
    window._uplinkStartTime = null;
    window._uplinkSeconds = 0;
    updateRing(0, true);
  }
}

// ── FOCUS TRACKING ──
let announcedEvents = {};

function startFocusTracking() {
  announcedEvents = {};

  // Clear any stale intervals defensively
  if (window._uplinkInterval) clearInterval(window._uplinkInterval);
  if (window._sessionMinuteTimer) clearInterval(window._sessionMinuteTimer);

  // Primary tick — every second, always
  window._uplinkInterval = setInterval(() => {
    if (!state.uplinkActive) return;
    // Advance uplink clock
    if (window._uplinkStartTime) {
      window._uplinkSeconds = Math.floor((Date.now() - window._uplinkStartTime) / 1000);
    }
    tickUI();
  }, 1000);

  // XP + focus minute tick — every 60s, only during market sessions
  window._sessionMinuteTimer = setInterval(() => {
    if (!state.uplinkActive || document.visibilityState === 'hidden') return;
    const inLondon = getSessionState('london').status === 'active';
    const inNY = getSessionState('ny').status === 'active';
    if (inLondon || inNY) {
      state.focusMinutes++;
      state.ghostMinutes++;
      awardXP(1);
      checkBounties();
      log(`Focus minute +1 | Total: ${state.focusMinutes}m | XP: ${state.xp}`, '');
    }
  }, 60000);
}

function stopFocusTracking() {
  clearInterval(window._uplinkInterval);
  clearInterval(window._sessionMinuteTimer);
  window._uplinkInterval = null;
  window._sessionMinuteTimer = null;
}

function tickUI() {
  const ist = getISTNow();
  document.getElementById('current-time').textContent = fmtTimeHMS(ist);

  const londonState = getSessionState('london');
  const nyState = getSessionState('ny');

  updateSessionCard('london', londonState);
  updateSessionCard('ny', nyState);

  // Determine primary active session for ring
  const active = londonState.status === 'active' ? londonState
               : nyState.status === 'active'     ? nyState
               : null;

  if (active) {
    // ── IN SESSION: ring = session progress (minute-granularity) ──
    const pct = Math.min(Math.round((active.elapsed / active.total) * 100), 100);
    const displayPct = document.visibilityState === 'hidden'
      ? Math.max(pct - 5, 0)   // penalise 5% for drifting away
      : pct;
    updateRing(displayPct, false);
    document.getElementById('session-timer').textContent = fmtMins(active.remaining) + ' LEFT';
  } else {
    // ── OUTSIDE SESSION: ring = uplink elapsed seconds / 3600 (1hr cap) ──
    // This makes sync move immediately from the first second uplink is pressed
    const totalSyncWindow = 3600; // 1 hour reference window
    const elapsed = window._uplinkSeconds || 0;
    const pct = Math.min(Math.round((elapsed / totalSyncWindow) * 100), 100);
    const driftPenalty = state.driftCount * 3; // each drift costs 3%
    const displayPct = Math.max(pct - driftPenalty, 0);
    updateRing(displayPct, false);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    document.getElementById('session-timer').textContent =
      `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')} UPLINK`;
  }

  // Check announcements
  checkAnnouncements(londonState, 'london');
  checkAnnouncements(nyState, 'ny');

  updateMetrics();
  updateRankUI();
}

function checkAnnouncements(ss, key) {
  if (ss.status !== 'active') return;
  const s = SESSIONS[key];

  if (!announcedEvents[key + '_start']) {
    announcedEvents[key + '_start'] = true;
    const msg = `${s.name} session is now live. Uplink locked. Trade with precision.`;
    speak(msg, 0.8, 0.65);
    sendNotification(`⚡ ${s.name} SESSION LIVE`, 'Focus protocol engaged. Stay on the charts.');
    log(`${s.name} SESSION STARTED`, 'cyan');
    showToast(`${s.name} SESSION LIVE`);
  }

  if (!announcedEvents[key + '_mid'] && ss.nowMins >= ss.mid) {
    announcedEvents[key + '_mid'] = true;
    const msg = `Midpoint check. ${s.name} session halfway through. Assess your trades. Stay disciplined.`;
    speak(msg, 0.85, 0.7);
    sendNotification(`📊 ${s.name} MIDPOINT`, 'Half the session done. Reassess. Stay locked in.');
    log(`${s.name} MIDPOINT CHECK — Stay disciplined.`, 'warn');
    showToast(`${s.name} MIDPOINT`);
  }

  if (!announcedEvents[key + '_warn15'] && ss.nowMins >= ss.warn15) {
    announcedEvents[key + '_warn15'] = true;
    const msg = `Warning. Fifteen minutes remaining in the ${s.name} session. Finalize your positions.`;
    speak(msg, 0.9, 0.6);
    sendNotification(`⚠ 15 MIN WARNING — ${s.name}`, 'Wrap up. Finalize positions. Clock is ticking.');
    log(`${s.name} — 15 MINUTE WARNING`, 'pink');
    showToast('15 MIN WARNING', true);
  }

  if (!announcedEvents[key + '_end'] && ss.status === 'offline' && announcedEvents[key + '_start']) {
    announcedEvents[key + '_end'] = true;
    const msg = `${s.name} session closed. Disconnect and review your performance.`;
    speak(msg, 0.85, 0.65);
    log(`${s.name} SESSION CLOSED.`, 'pink');
    if (!state.sessionsCompleted.includes(key)) {
      state.sessionsCompleted.push(key);
      checkBounties();
    }
  }
}

// ── SESSION CARD UPDATE ──
function updateSessionCard(key, ss) {
  const card = document.getElementById('card-' + key);
  const badge = document.getElementById('badge-' + key);
  const countdown = document.getElementById('countdown-' + key);

  card.className = 'session-card ' + ss.status;

  if (ss.status === 'active') {
    badge.textContent = 'LIVE';
    countdown.textContent = fmtMins(ss.remaining) + ' LEFT';
  } else if (ss.status === 'upcoming') {
    badge.textContent = 'UPCOMING';
    countdown.textContent = 'IN ' + fmtMins(ss.minsUntil);
  } else {
    badge.textContent = 'OFFLINE';
    countdown.textContent = '';
  }
}

// ── RING ──
function updateRing(pct, reset = false) {
  const circ = 2 * Math.PI * 90; // 565.48
  if (reset) {
    document.getElementById('ring-progress').style.strokeDashoffset = circ;
    document.getElementById('sync-rate').textContent = '0%';
    document.getElementById('session-timer').textContent = '--:--';
    return;
  }
  const offset = circ - (pct / 100) * circ;
  document.getElementById('ring-progress').style.strokeDashoffset = offset;
  document.getElementById('sync-rate').textContent = pct + '%';
}

// ── METRICS ──
function updateMetrics() {
  document.getElementById('focus-mins').textContent = state.focusMinutes;
  document.getElementById('drift-count').textContent = state.driftCount;
  const maxFocus = 150;
  const maxDrift = 20;
  document.getElementById('focus-bar').style.width = Math.min((state.focusMinutes / maxFocus) * 100, 100) + '%';
  document.getElementById('drift-bar').style.width = Math.min((state.driftCount / maxDrift) * 100, 100) + '%';
}

// ── XP + RANK ──
function awardXP(amount) {
  state.xp += amount;
  saveState();
}

function getCurrentRank() {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (state.xp >= r.xp) rank = r;
  }
  return rank;
}

function getNextRank() {
  for (const r of RANKS) {
    if (r.xp > state.xp) return r;
  }
  return null;
}

function updateRankUI() {
  const current = getCurrentRank();
  const next = getNextRank();
  document.getElementById('rank-name').textContent = current.name;
  document.getElementById('xp-display').textContent = state.xp + ' XP';

  if (next) {
    document.getElementById('rank-next').textContent = `Next: ${next.name} @ ${next.xp} XP`;
    const rangeStart = current.xp;
    const rangeEnd = next.xp;
    const pct = Math.min(((state.xp - rangeStart) / (rangeEnd - rangeStart)) * 100, 100);
    document.getElementById('xp-bar').style.width = pct + '%';
  } else {
    document.getElementById('rank-next').textContent = 'MAX RANK ACHIEVED';
    document.getElementById('xp-bar').style.width = '100%';
  }
}

// ── BOUNTIES ──
function checkBounties() {
  BOUNTIES.forEach(b => {
    if (state.claimedBounties.includes(b.id)) return;

    let earned = false;
    if (b.special === 'nodrift' && state.driftCount === 0 && state.focusMinutes >= 10) earned = true;
    if (b.special === 'ghost30' && state.ghostMinutes >= 30) earned = true;
    if (b.special === 'double' && state.sessionsCompleted.length >= 2) earned = true;
    if (b.special === 'streak3' && state.streak >= 3) earned = true;
    if (!b.special && state.focusMinutes >= b.xpReq && b.xpReq > 0) earned = true;

    if (earned) {
      state.claimedBounties.push(b.id);
      awardXP(25);
      saveState();
      renderBounties();
      log(`BOUNTY CLAIMED: ${b.name} (+25 XP)`, 'cyan');
      speak(`Bounty unlocked. ${b.name}. Twenty five experience points awarded.`);
      showToast(`BOUNTY: ${b.name} +25XP`);
    }
  });
}

function renderBounties() {
  const grid = document.getElementById('bounty-grid');
  grid.innerHTML = '';
  BOUNTIES.forEach(b => {
    const claimed = state.claimedBounties.includes(b.id);
    const item = document.createElement('div');
    item.className = 'bounty-item' + (claimed ? ' claimed' : '');
    item.innerHTML = `
      <div class="bounty-icon">${SVG_ICONS[b.icon] || ''}</div>
      <div class="bounty-text">
        <div class="bounty-name">${b.name}</div>
        <div class="bounty-req">${b.req}</div>
      </div>
      <div class="bounty-check">${claimed ? '✓' : ''}</div>
    `;
    grid.appendChild(item);
  });
}

// ── VISIBILITY API ──
let hiddenSince = null;
let driftWarningShown = false;

document.addEventListener('visibilitychange', () => {
  if (!state.uplinkActive) return;

  if (document.visibilityState === 'hidden') {
    hiddenSince = Date.now();
    driftWarningShown = false;

    // Show overlay warning
    document.getElementById('uplink-lost').style.display = 'block';
    document.getElementById('uplink-lost-msg').style.display = 'block';

    // Increment drift after 5 seconds hidden
    setTimeout(() => {
      if (document.visibilityState === 'hidden' && state.uplinkActive) {
        state.driftCount++;
        state.ghostMinutes = 0;  // reset ghost streak
        updateMetrics();
        sendNotification('⚠ DRIFT DETECTED', 'Return to NEURAL LINK. Your sync rate is degrading.');
      }
    }, 5000);

  } else {
    // Returned to tab
    document.getElementById('uplink-lost').style.display = 'none';
    document.getElementById('uplink-lost-msg').style.display = 'none';

    const away = hiddenSince ? Math.round((Date.now() - hiddenSince) / 1000) : 0;
    hiddenSince = null;

    if (away > 5) {
      log(`Drift event: ${away}s away from terminal. Sync degraded.`, 'pink');
      showToast('DRIFT DETECTED', true);
      speak('Uplink restored. Sync rate recovering. Stay on the charts.');
    } else {
      log('Uplink reestablished.', 'cyan');
    }
  }
});

// ── NOTIFICATION PERMISSION BANNER ──
function checkNotifBanner() {
  const banner = document.getElementById('notif-banner');
  if (!('Notification' in window) || Notification.permission === 'granted') {
    banner.style.display = 'none';
  }
}

// ── AUDIO CONTEXT: Resume on interaction (mobile requirement) ──
document.addEventListener('click', () => {
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}, { once: true });

// ── EXPOSE GLOBALS (required for onclick= attributes with 'use strict') ──
window.toggleUplink = toggleUplink;
window.toggleAudio = toggleAudio;
window.requestNotifPermission = requestNotifPermission;

// ── BOOT ──
(function boot() {
  loadState();
  registerSW();
  checkNotifBanner();
  renderBounties();
  updateRankUI();
  updateMetrics();

  // Inject SVG icons into buttons
  document.getElementById('btn-uplink').innerHTML = SVG_ICONS.power + ' START UPLINK';
  document.getElementById('btn-audio').innerHTML = SVG_ICONS.radar + ' AMBIENCE: OFF';

  // Inject SVG into rank card label
  const rankLabel = document.getElementById('rank-label-el');
  if (rankLabel) rankLabel.innerHTML = SVG_ICONS.chevron + ' BOUNTY RANK';

  // Inject SVG pulse into ring label
  const ringLabel = document.getElementById('ring-label-el');
  if (ringLabel) ringLabel.innerHTML = SVG_ICONS.pulse + ' SYNC';

  // Populate time immediately
  document.getElementById('current-time').textContent = fmtTimeHMS(getISTNow());

  // Boot log
  setTimeout(() => {
    log('All systems nominal. Awaiting uplink command.', '');
    log('London: 12:30–14:30 IST | New York: 17:30–20:00 IST', 'cyan');
  }, 500);

  // Passive tick even without uplink (for session card countdowns)
  setInterval(() => {
    document.getElementById('current-time').textContent = fmtTimeHMS(getISTNow());
    const ls = getSessionState('london');
    const ns = getSessionState('ny');
    updateSessionCard('london', ls);
    updateSessionCard('ny', ns);
  }, 1000);
})();
