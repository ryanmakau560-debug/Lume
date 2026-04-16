import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { 
  getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove 
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

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const getUserPreferences = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    // If doc exists, return it; otherwise return the default structure
    return userDoc.exists() ? userDoc.data() : { starredCoins: [] };
  } catch (e) {
    console.error("Error fetching prefs:", e);
    return { starredCoins: [] };
  }
};

export const toggleStarCoin = async (uid, coinId, isStarred) => {
  const userRef = doc(db, "users", uid);
  try {
    // FIX: Changed updateDoc to setDoc with merge: true
    // This creates the user document if it doesn't exist yet
    await setDoc(userRef, {
      starredCoins: isStarred ? arrayRemove(coinId) : arrayUnion(coinId)
    }, { merge: true });
    
    console.log(`Successfully ${isStarred ? 'removed' : 'added'} ${coinId}`);
  } catch (e) {
    console.error("Watchlist Error:", e);
    // Alerting here helps you debug if your Firestore Rules are blocking the write
    alert("Sync Error: Make sure your Firestore Rules allow writes.");
  }
};