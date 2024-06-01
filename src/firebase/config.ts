import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg998CIcN0TQt7ngDx8TotnJHE4j4rx_4",
  authDomain: "chat-app-44da4.firebaseapp.com",
  projectId: "chat-app-44da4",
  storageBucket: "chat-app-44da4.appspot.com",
  messagingSenderId: "660190948697",
  appId: "1:660190948697:web:25f38a94ead79be405f048"
};

const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
export const db = getFirestore(app)