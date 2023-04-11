importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}
firebase.initializeApp({
  apiKey: "AIzaSyBRLRuEcPI9xqd54QLiK_pG9uzeA4ulCn4",
  authDomain: "her-plan-33483.firebaseapp.com",
  projectId: "her-plan-33483",
  storageBucket: "her-plan-33483.appspot.com",
  messagingSenderId: "704165832902",
  appId: "1:704165832902:web:c855eda6ad3420061c0fc7",
  measurementId: "G-J0FHD28CKG",
});

const sendMsg = async (id, room) => {
  const cc = await clients.get(id);
  return cc.postMessage({ roomName: room, backgroud: true });
};
//Code for adding event on click of notification
self.addEventListener("notificationclick", async function (event) {
  if (
    event.notification.data &&
    event.notification.data.FCM_MSG &&
    event.notification.data.FCM_MSG.data &&
    event.notification.data.FCM_MSG.data.roomName
  ) {
    // console.log(
    //   "notificationclick",
    //   event.notification.data.FCM_MSG.data.roomName
    // );
    event.notification.close();
    var urlToRedirect = `/message/${event.notification.data.FCM_MSG.data.roomName}`;
    event.waitUntil(
      (async function () {
        const allClients = await clients.matchAll({
          includeUncontrolled: true,
        });
        let chatClient;
        let appUrl = "https://directory.herplan.org/";
        for (const client of allClients) {
          if (client["url"].includes(appUrl)) {
            // client.focus();
            sendMsg(client.id, event.notification.data.FCM_MSG.data.roomName);
            chatClient = client;
            break;
          }
        }
        if (!chatClient) {
          chatClient = await clients.openWindow(urlToRedirect);
        }
      })()
    );
  }
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("in backgrpud", payload);
  //   if (payload.data.roomName && payload.notification.title) {
  //     const notiData = {
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //       icon: "https://s30912.pcdn.co/wp-content/uploads/sites/6/2021/08/her-plan-400.png",
  //       data: { roomName: "xyz" },
  //     };
  //     self.registration.showNotification(payload.notification.title, notiData);
  //   }
});
