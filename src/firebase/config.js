
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD5Uut7tNBMBRfNqSljD9q_IZXl2lNwpcg",
  authDomain: "rdnov-react.firebaseapp.com",
  projectId: "rdnov-react",
  storageBucket: "rdnov-react.appspot.com",
  messagingSenderId: "166353707300",
  appId: "1:166353707300:web:089d023efceae9507153b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=getFirestore(app)
export default app