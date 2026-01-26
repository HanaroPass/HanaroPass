self.addEventListener('push', (event) => {
  if (event.data) {
    const payload = event.data.json();
    const options = {
      body: payload.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      data: { url: payload.url || '/' },
    };
    event.waitUntil(self.registration.showNotification(payload.title, options));
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
