import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAz0GbMv242uQaby0oa0VUzBqPzoZ_pBAw",
  authDomain: "students-registration-dsktop-a.firebaseapp.com",
  databaseURL: "https://students-registration-dsktop-a.firebaseio.com",
  projectId: "students-registration-dsktop-a",
  storageBucket: "students-registration-dsktop-a.appspot.com",
  messagingSenderId: "746866502927",
  appId: "1:746866502927:web:5a7840f318ccdbd5e9a27a",
  measurementId: "G-3LW3ML6BK9"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export {googleAuthProvider, auth}