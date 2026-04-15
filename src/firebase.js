import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// These match your Lume AI project exactly
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY", 
  authDomain: "lume-ai-d15a6.firebaseapp.com",
  projectId: "lume-ai-d15a6",
  storageBucket: "lume-ai-d15a6.appspot.com",
  messagingSenderId: "656218266322",
  appId: "YOUR_ACTUAL_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Standard Popup (Yesterday's version)
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Auth Error:", error.code);
    return null;
  }
};

export const getUserPreferences = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data() : { starredCoins: [] };
  } catch (e) { return { starredCoins: [] }; }
};

export const toggleStarCoin = async (uid, coinId, isStarred) => {
  const userRef = doc(db, "users", uid);
  try {
    if (isStarred) {
      await updateDoc(userRef, { starredCoins: arrayRemove(coinId) });
    } else {
      await updateDoc(userRef, { starredCoins: arrayUnion(coinId) });
    }
  } catch (e) { console.error(e); }
};