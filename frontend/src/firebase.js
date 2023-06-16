import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCE4T4-xrgnKrSkg-TBfJ6sjLCBXVVKXDw",
  authDomain: "greenertech-a2336.firebaseapp.com",
  projectId: "greenertech-a2336",
  storageBucket: "greenertech-a2336.appspot.com",
  messagingSenderId: "293631495966",
  appId: "1:293631495966:web:612fe2d62230ca5c68830f",
  measurementId: "G-NE87THEMDE"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };