import firebase from 'firebase';
require('firebase/firestore');

var config = {
    apiKey: "AIzaSyDmsYm4Q2-NIg1ctuHoMgXJ7lIGATXb9Nk",
    authDomain: "pen-it-down.firebaseapp.com",
    databaseURL: "https://pen-it-down.firebaseio.com",
    projectId: "pen-it-down",
    storageBucket: "pen-it-down.appspot.com",
    messagingSenderId: "309652916494"
  };
  firebase.initializeApp(config);

export const db = firebase.firestore();