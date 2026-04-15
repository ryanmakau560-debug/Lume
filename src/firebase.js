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

// PASTE YOUR ACTUAL STRINGS FROM FIREBASE CONSOLE HERE
const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "lume-view.firebaseapp.com",
  projectId: "lume-view",
  storageBucket: "lume-view.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Logic
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Auth Error:", error.code, error.message);
  }
};

// Fetch User Preferences (Watchlist)
export const getUserPreferences = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      const initialData = { starredCoins: [] };
      await setDoc(doc(db, "users", uid), initialData);
      return initialData;
    }
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return { starredCoins: [] };
  }
};

// Toggle Star/Watchlist Logic
export const toggleStarCoin = async (uid, coinId, isStarred) => {
  const userRef = doc(db, "users", uid);
  try {
    if (isStarred) {
      await updateDoc(userRef, {
        starredCoins: arrayRemove(coinId)
      });
    } else {
      await updateDoc(userRef, {
        starredCoins: arrayUnion(coinId)
      });
    }
  } catch (error) {
    console.error("Firestore Update Error:", error);
  }
};