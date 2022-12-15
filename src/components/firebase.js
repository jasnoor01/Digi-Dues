// const firebase=require('firebase')
import firebase from 'firebase'
// import * as firebase from "firebase/app";

// var firebaseConfig = {
//     apiKey: "AIzaSyDnLu90BblFjXhvvsD3lmpIp0npvRQmPdM",
//     authDomain: "paytm-status-fff25.firebaseapp.com",
//     projectId: "paytm-status-fff25",
//     storageBucket: "paytm-status-fff25.appspot.com",
//     messagingSenderId: "1002188865126",
//     appId: "1:1002188865126:web:21d30c90cc4fda3fc137a7",
//     measurementId: "G-CSHK7D3DEE"
//   };
const firebaseConfig = {

  apiKey: "AIzaSyBaHBcPMnaTeKT27foYiT3Ydlv1CQR5cCY",
  authDomain: "digi-dues.firebaseapp.com",
  projectId: "digi-dues",
  storageBucket: "digi-dues.appspot.com", 
  messagingSenderId: "824079267275",
  appId: "1:824079267275:web:c5dceee8241ee6d962f24e",
  measurementId: "G-Z5DB54345K"
};


  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore()
  export {db}