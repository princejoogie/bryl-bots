import firebase from "firebase";

/**
 * NOTE:
 * These are client api keys so no security issues.
 */
const firebaseConfig = {
  apiKey: "AIzaSyC3BDrPfe3kBdYu022ndvpd-4MyLz6ZGiE",
  authDomain: "suggest-bot-bryl.firebaseapp.com",
  projectId: "suggest-bot-bryl",
  storageBucket: "suggest-bot-bryl.appspot.com",
  messagingSenderId: "236852596043",
  appId: "1:236852596043:web:d3c687e901f37578e9ecce",
  measurementId: "G-4VW1R50R8B",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const toServerDate = firebase.firestore.Timestamp.fromDate;

export { db, timestamp, firebase, toServerDate };
