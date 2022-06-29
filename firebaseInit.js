var Firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyDYzrPUmcQAluMvR1Rguk3p_aAlf_Pvils",
  authDomain: "shopping-app-d0dcf.firebaseapp.com",
  projectId: "shopping-app-d0dcf",
  storageBucket: "shopping-app-d0dcf.appspot.com",
  messagingSenderId: "449880832030",
  appId: "1:449880832030:web:4fcda91145f975a6ae560f",
  measurementId: "G-21N7DC9ECS"
};

Firebase.initializeApp(firebaseConfig);

var firebase = Firebase

module.exports = firebase