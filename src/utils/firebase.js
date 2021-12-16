import { initializeApp } from "firebase/app";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onIdTokenChanged
} from "firebase/auth";

import config from "utils/configConstant"

require('dotenv').config()

console.log("node env====>", process.env.NODE_ENV);
console.log("firebase====>", process.env.FIREBASE_API_KEY);
console.log("process.env.FIREBASE_API_KEY", process.env.FIREBASE_AUTH_DOMAIN);
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.MEASURE_ID
};

initializeApp(firebaseConfig);
const auth = getAuth();


const tokenListener = () => {
  onIdTokenChanged(auth, async user => {
    if (user) {
      const token = await user.getIdToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem(config.AUTH_TOKEN, token);
    } else {
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
    }
  })
}

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


export {
  auth,
  registerWithEmailAndPassword,
  signInNormal,
  resetPassword,
  logout,
  tokenListener
};
