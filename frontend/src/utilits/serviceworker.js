self.addEventListener('push', (e) => {
    let data = {};
    try { data = e.data.json(); } catch (e) { data = { title: "New", body: "You have a new message" }; }

    const title = data.title || "App";
    const options = {
        body: data.body,
        icon: data.icon || "/icons/icon-192.png",
        data: data.url || "/",
        actions: data.actions || []
    };

    e.waitUntil(self.registration(title, options))
})

self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    const url = event.notification.data || "/";
    event.waitUntil(clients.openWindow(url));
});