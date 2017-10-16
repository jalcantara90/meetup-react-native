import * as firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCfFSTMB6nQwWbCxiZdG0eryuzMXdWfwHY",
  authDomain: "meetup-project-aa0ab.firebaseapp.com",
  databaseURL: "https://meetup-project-aa0ab.firebaseio.com",
  projectId: "meetup-project-aa0ab",
  storageBucket: "",
  messagingSenderId: "596885942443"
})

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

export default firebase;