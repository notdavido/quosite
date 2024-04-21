// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';

// import { Firestore, getFirestore } from 'firebase/firestore';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
// var provider = new Firestore.auth.GoogleAuthProvider();




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfLy16MYJdhVDMBEsLI-OpvvzE_-Pp1WM",
  authDomain: "websitequoteproj.firebaseapp.com",
  projectId: "websitequoteproj",
  storageBucket: "websitequoteproj.appspot.com",
  messagingSenderId: "2692474268",
  appId: "1:2692474268:web:3c80dbd6a1da22738d5459",
  measurementId: "G-D7J1B3EQKV",
  databaseURL: `https://websitequoteproj-default-rtdb.firebaseio.com/`,
};



function googleProvider() {
  // [START auth_google_provider_create]
  var provider = new firebase.auth.GoogleAuthProvider();
  // [END auth_google_provider_create]

  // [START auth_google_provider_scopes]
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // [END auth_google_provider_scopes]
  
  // [START auth_google_provider_params]
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  // [END auth_google_provider_params]
}

function googleSignInPopup(provider) {
  // [START auth_google_signin_popup]
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
        // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  // [END auth_google_signin_popup]
}

function googleSignInRedirectResult() {
  // [START auth_google_signin_redirect_result]
  firebase.auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
        // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  // [END auth_google_signin_redirect_result]
}

function googleBuildAndSignIn(id_token) {
  // [START auth_google_build_signin]
  // Build Firebase credential with the Google ID token.
  var credential = firebase.auth.GoogleAuthProvider.credential(id_token);

  // Sign in with credential from the Google user.
  firebase.auth().signInWithCredential(credential).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  // [END auth_google_build_signin]
}

// [START auth_google_callback]
function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
  
      // Sign in with credential from the Google user.
      // [START auth_google_signin_credential]
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      // [END auth_google_signin_credential]
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}
// [END auth_google_callback]

// [START auth_google_checksameuser]
function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}
// [END auth_google_checksameuser]

function googleProviderCredential(idToken) {
  // [START auth_google_provider_credential]
  var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
  // [END auth_google_provider_credential]
}
console.log("asdfasdf")
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
// var someFunction = function()
// Define the submittingform function
export function submittingform(event) {
  event.preventDefault(); // Prevent the default form submission
  console.log("Form submitted!");
  const quote = document.getElementById("quote").value;
  const tags = document.getElementById("tag-input").value.split(',');
  const lines = document.getElementById("lines").value;
  const page = document.getElementById("page").value;

  const data = {
      quote: quote,
      tags: tags,
      lines: lines,
      page: page
  };

  // Use set function to write data to the database
  set(ref(db, 'quotes/' + quote), data)
      .then(() => {
          console.log("Data successfully written to the database");
          // Optionally reset the form here
      })
      .catch((error) => {
          console.error("Error writing data to the database: ", error);
          alert("An error occurred while submitting the form. Please try again.");
      });
}

// Attach the submittingform function to the form's submit event
// document.getElementById("submitButton").addEventListener("click", submittingform);


function register(){
  email = document.getElementsById('email').value
  password = document.getElementsById('passowrd').value

  if (validateemail(email) == false || validatepassword(password) == false) {
    return
  }
  auth.UserWithEmailAndPassword(email,password)
  .then(function() {
    
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      email : email,
      last_login : Date.now()
    }

    database_ref.ref.child('users/' + user.uid).set()

    alert('user created')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message
  })
}

function validateemail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
   {
     return true
   }
     alert("You have entered an invalid email address!")
     return false
 }
 
 function validatepassword(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}