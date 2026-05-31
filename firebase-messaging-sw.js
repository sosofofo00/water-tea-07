importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDtrmXs36Ea5v7bEE2GEJiZPBAcoA2dPZs",
    authDomain: "water-tea-system.firebaseapp.com",
    databaseURL: "https://water-tea-system-default-rtdb.firebaseio.com",
    projectId: "water-tea-system",
    storageBucket: "water-tea-system.appspot.com",
    messagingSenderId: "1083980327427",
    appId: "1:1083980327427:web:9c79fa17cfce3d59a80e14"
});

const messaging = firebase.messaging();

// 背景通知處理
messaging.onBackgroundMessage((payload) => {
    console.log('背景通知:', payload);
    const { title, body, icon } = payload.notification || {};
    self.registration.showNotification(title || '水之茶 庫存盤點', {
        body: body || '',
        icon: icon || '/icon.png',
        badge: '/icon.png',
        vibrate: [200, 100, 200],
        data: payload.data || {},
        actions: [{ action: 'open', title: '開啟' }]
    });
});

// 點擊通知開啟 app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('sosofofo00.github.io') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('https://sosofofo00.github.io/water-tea-07/');
            }
        })
    );
});
