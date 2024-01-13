import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuMJxYw3peQm7RHy5rKd4XxHQCDa2i4Cc",
  authDomain: "dropbox-clone-next13.firebaseapp.com",
  projectId: "dropbox-clone-next13",
  storageBucket: "dropbox-clone-next13.appspot.com",
  messagingSenderId: "26599822095",
  appId: "1:26599822095:web:8ee9c5e5901e47d53b247a",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
