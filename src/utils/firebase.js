// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
//import { getDataBase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVC071f65--uqNJNpKoueyHEtC3jQWMTU",
  authDomain: "davos-57f96.firebaseapp.com",
  databaseURL: "https://davos-57f96-default-rtdb.firebaseio.com",
  projectId: "davos-57f96",
  storageBucket: "davos-57f96.appspot.com",
  messagingSenderId: "1038612395003",
  appId: "1:1038612395003:web:c089f2617f71b561d1515e",
  measurementId: "G-76EJH0VZKK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const db = getDataBase(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const cloudStorage = getStorage(app);
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
// export const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider("6LdZ-sAoAAAAAHDSB_HvkN625kF7FO-ANXfa9Z1j"),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true,
// });
