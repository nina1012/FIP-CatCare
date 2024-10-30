/* eslint-disable no-undef */
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/cute-pink-paws.png',
  };
  event.waitUntil(
    self.registration.showNotification('FIP CatCare app', options),
  );
});
