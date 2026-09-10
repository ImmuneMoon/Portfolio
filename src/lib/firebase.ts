// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBreideVCCsnJEsgBQJMXntVn8BzHCQ-R4",
  authDomain: "portfolio-4mkvh.firebaseapp.com",
  projectId: "portfolio-4mkvh",
  storageBucket: "portfolio-4mkvh.firebasestorage.app",
  messagingSenderId: "654300194401",
  appId: "1:654300194401:web:36063972e49756a7f62c20",
  measurementId: "G-QJQR2XFZBB"
};

// Initialize Firebase for client-side
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

if (typeof window !== "undefined") {
  if ("measurementId" in firebaseConfig) {
    getAnalytics(app);
  }
}

export { app };
