// ═══════════════════════════════════════════════════════
// NEURAL LINK — sw.js (Service Worker)
// ═══════════════════════════════════════════════════════

const CACHE_NAME = 'neural-link-v1';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=VT323&display=swap'
];

// ── INSTALL: Cache all assets ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(() => {
        // Non-fatal: some assets may fail (e.g. fonts offline)
        return Promise.resolve();
      });
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: Clean old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-first strategy ──
self.addEventListener('fetch', event => {
  // Skip non-GET and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});

// ── MESSAGE HANDLER: Receive commands from app.js ──
self.addEventListener('message', event => {
  const { type, payload } = event.data || {};

  switch (type) {
    case 'KEEPALIVE':
      // App pings SW every 20s to signal active session
      // SW responds to confirm it's alive
      if (event.source) {
        event.source.postMessage({ type: 'KEEPALIVE_ACK', ts: Date.now() });
      }
      break;

    case 'SESSION_START':
      scheduleSessionAlerts(payload);
      break;

    case 'SESSION_END':
      clearScheduledAlerts();
      break;

    case 'SHOW_NOTIF':
      self.registration.showNotification(payload.title, {
        body: payload.body,
        icon: './icon-192.png',
        badge: './icon-192.png',
        tag: 'neural-link-' + (payload.tag || 'alert'),
        renotify: true,
        vibrate: [200, 100, 200, 100, 200],
        data: { url: self.registration.scope }
      });
      break;

    default:
      break;
  }
});

// ── NOTIFICATION CLICK ──
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || self.registration.scope;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ── BACKGROUND SYNC (for future use) ──
self.addEventListener('sync', event => {
  if (event.tag === 'neural-sync') {
    event.waitUntil(syncSession());
  }
});

async function syncSession() {
  // Placeholder for future backend sync (e.g. streak tracking via Supabase)
  return Promise.resolve();
}

// ── SCHEDULED ALERTS (via SW setTimeout, works when page is minimized) ──
let alertTimeouts = [];

function scheduleSessionAlerts(payload) {
  clearScheduledAlerts();
  if (!payload || !payload.alerts) return;

  payload.alerts.forEach(alert => {
    const delay = alert.delayMs;
    if (delay < 0) return;
    const tid = setTimeout(() => {
      self.registration.showNotification(alert.title, {
        body: alert.body,
        icon: './icon-192.png',
        tag: 'neural-link-scheduled',
        renotify: true,
        vibrate: [300, 100, 300],
        data: { url: self.registration.scope }
      });
    }, delay);
    alertTimeouts.push(tid);
  });
}

function clearScheduledAlerts() {
  alertTimeouts.forEach(tid => clearTimeout(tid));
  alertTimeouts = [];
}

// ── PERIODIC BACKGROUND SYNC (if supported) ──
self.addEventListener('periodicsync', event => {
  if (event.tag === 'neural-ping') {
    event.waitUntil(
      clients.matchAll().then(clients => {
        clients.forEach(c => c.postMessage({ type: 'SW_PING' }));
      })
    );
  }
});
