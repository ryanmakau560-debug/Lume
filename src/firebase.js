import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithRedirect, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
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
  apiKey: "AIzaSyB-m1k1u-LUM3-AI-d15a6-EXAMPLE", // NOTE: Use the API key from your settings
  authDomain: "lume-ai-d15a6.firebaseapp.com",
  projectId: "lume-ai-d15a6",
  storageBucket: "lume-ai-d15a6.appspot.com",
  messagingSenderId: "656218266322",
  appId: "1:656218266322:web:your_specific_app_id" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// LOGIN VIA REDIRECT (No more pop-up issues)
export const signInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Auth Error:", error.code);
  }
};

export const getUserPreferences = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) return userDoc.data();
    const initial = { starredCoins: [] };
    await setDoc(doc(db, "users", uid), initial);
    return initial;
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
  } catch (e) { console.error("Firestore Error:", e); }
};