import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGVxkDKV0or4gMCXYrOcRLoj_rEk3h0AM",
  authDomain: "lume-ai-d15a6.firebaseapp.com",
  projectId: "lume-ai-d15a6",
  storageBucket: "lume-ai-d15a6.firebasestorage.app",
  messagingSenderId: "656218266322",
  appId: "1:656218266322:web:381989504e03030fd52b0b",
  measurementId: "G-NCB4QJ2YWZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Stable Popup Sign-in
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const getUserPreferences = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) return userDoc.data();
    const initial = { starredCoins: [] };
    await setDoc(doc(db, "users", uid), initial);
    return initial;
  } catch (e) {
    return { starredCoins: [] };
  }
};

export const toggleStarCoin = async (uid, coinId, isStarred) => {
  const userRef = doc(db, "users", uid);
  try {
    if (isStarred) {
      await updateDoc(userRef, { starredCoins: arrayRemove(coinId) });
    } else {
      await updateDoc(userRef, { starredCoins: arrayUnion(coinId) });
    }
  } catch (e) {
    console.error("Watchlist Update Error:", e);
  }
};