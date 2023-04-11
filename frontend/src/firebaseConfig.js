import config from "./config";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { store } from "./redux/store";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBRLRuEcPI9xqd54QLiK_pG9uzeA4ulCn4",
  authDomain: "her-plan-33483.firebaseapp.com",
  projectId: "her-plan-33483",
  storageBucket: "her-plan-33483.appspot.com",
  messagingSenderId: "704165832902",
  appId: "1:704165832902:web:c855eda6ad3420061c0fc7",
  measurementId: "G-J0FHD28CKG",
});

const messaging = getMessaging(firebaseApp);
const onMessageListin = (payload) => {
  const { data } = payload;
  if (data && data.roomName && data.backgroud) {
    const rn = store.getState().msg.selRoom;
    const auth = store.getState().auth.user;
    if (
      auth &&
      (!window.location.href.includes("/message") ||
        !rn ||
        (rn &&
          window.location.href.includes("/message") &&
          rn.roomName !== data.roomName))
    ) {
      window.location.href = `${config.url}message/${data.roomName}`;
    }
  }
};

navigator.serviceWorker.addEventListener("message", onMessageListin);

export const regNotiData = async (loc) => {
  try {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload.data, payload.notification);
      if (payload && payload.data && payload.data.roomName) {
        const rn = store.getState().msg.selRoom;
        const auth = store.getState().auth.user;
        if (
          auth &&
          (!window.location.href.includes("/message") ||
            !rn ||
            (rn &&
              window.location.href.includes("/message") &&
              rn.roomName !== payload.data.roomName))
        ) {
          toast.info(
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              onClick={() => loc(`/message/${payload.data.roomName}`)}
            >
              <div style={{ fontSize: "18px", fontWeight: 600 }}>
                {payload.notification.title}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  height: "30px",
                  overflow: "hidden",
                }}
              >
                {payload.notification.body}
              </div>
            </div>,
            {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFBToken = async () => {
  try {
    return getToken(messaging, {
      vapidKey: config.firebaseNotiKey,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          return currentToken;
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          return false;
          // shows on the UI that permission is required
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // catch error while creating client token
        return false;
      });
  } catch (error) {
    console.log("errr", error);
  }
};
