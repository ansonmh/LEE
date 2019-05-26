import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCzTryX4ww7ZSICofF0D-3C3PNcIElvKcQ",
    authDomain: "leehinghong-30b89.firebaseapp.com",
    databaseURL: "https://leehinghong-30b89.firebaseio.com",
    projectId: "leehinghong-30b89",
    storageBucket: "leehinghong-30b89.appspot.com",
    messagingSenderId: "689858190804"
  };
  firebase.initializeApp(config);
//bottom of the file
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();
