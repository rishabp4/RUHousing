import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSBvFwDKecmk9w204fUHK4njlf_2fTrRc",
  authDomain: "login-test-39451.firebaseapp.com",
  projectId: "login-test-39451",
  storageBucket: "login-test-39451.firebasestorage.app",
  messagingSenderId: "419546306697",
  appId: "1:419546306697:web:5fac4acdf35e007468ce58",
  measurementId: "G-QXGERW0V76"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Get Auth and Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export them
export { auth, provider };
