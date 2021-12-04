import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2odgYKZnrhyZk-vxgts55P_Re6CXyznA",
  authDomain: "urban-chowk.firebaseapp.com",
  projectId: "urban-chowk",
  storageBucket: "urban-chowk.appspot.com",
  messagingSenderId: "931550668356",
  appId: "1:931550668356:web:9de76679ce9347e2b2be11",
  measurementId: "G-VTG90816CK",
};

initializeApp(firebaseConfig);
const auth = getAuth();

// const db = app.firestore();
// const googleProvider = auth.GoogleAuthProvider();

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    user["authProvider"] = "local";
    return user;
  } catch (err) {
    throw err;
  }
};

//Normal Sign In with Email and Password
const signInNormal = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    user["authProvider"] = "local";
    return user;
  } catch (err) {
    throw err;
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw err;
  }
};

const logout = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Social Login: Google
// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

export {
  auth,
  // signInWithGoogle,
  // signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInNormal,
  resetPassword,
  logout,
};
