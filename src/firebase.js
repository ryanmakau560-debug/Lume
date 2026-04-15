import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGVxkDKV0or4gMCXYrOcRLoj_rEk3h0AM",
  authDomain: "lume-ai-d15a6.firebaseapp.com",
  projectId: "lume-ai-d15a6",
  storageBucket: "lume-ai-d15a6.firebasestorage.app",
  messagingSenderId: "656218266322",
  appId: "1:656218266322:web:381989504e03030fd52b0b",
  measurementId: "G-NCB4QJ2YWZ"
};

// 1. Initialize the app [cite: 53, 242]
const app = initializeApp(firebaseConfig);

// 2. Setup Auth and Firestore [cite: 55, 182, 186]
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 3. Helper function for the "Sign In" button
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};

// 4. Helper function for Logout [cite: 185, 256]
export const logoutUser = () => signOut(auth);