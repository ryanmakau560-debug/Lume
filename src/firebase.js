import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};

export const logoutUser = () => signOut(auth);

// --- LUME PERSISTENCE LOGIC ---

export const toggleStarCoin = async (userId, coinId, isStarred) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      starredCoins: isStarred ? arrayRemove(coinId) : arrayUnion(coinId),
      lastViewed: coinId 
    }, { merge: true });
  } catch (error) {
    console.error("Firestore Update Error:", error);
  }
};

export const getUserPreferences = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : { starredCoins: [], lastViewed: null };
  } catch (error) {
    // Gracefully handle the "Offline" error you saw in the console
    console.warn("LUME is currently in offline mode:", error.message);
    return { starredCoins: [], lastViewed: null };
  }
};