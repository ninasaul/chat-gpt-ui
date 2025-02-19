// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGC748SM7e6Kx17GkA_ZDu0jAucr-56fs",
  authDomain: "danora-73e6e.firebaseapp.com",
  projectId: "danora-73e6e",
  storageBucket: "danora-73e6e.firebasestorage.app",
  messagingSenderId: "540294195258",
  appId: "1:540294195258:web:3a2f47ef8ea9c421e66d03",
  measurementId: "G-KTE3Q4GJ1L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export the auth and provider for use in other parts of your app
export { auth, googleProvider };

//web client id- 540294195258-6hc0bf5pl3jbb94ummc7a713gg1f7bpq.apps.googleusercontent.com