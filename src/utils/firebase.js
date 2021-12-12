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
