import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqccKO-nrtLyaOUuAl7269Ov19tS53E_8",
  authDomain: "moodmix-96fdd.firebaseapp.com",
  projectId: "moodmix-96fdd",
  storageBucket: "moodmix-96fdd.appspot.com",
  messagingSenderId: "16271956681",
  appId: "1:16271956681:web:57638cd724c5e994780b18",
  measurementId: "G-99YN40JDNX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };