// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';

// import { Firestore, getFirestore } from 'firebase/firestore';



import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";





// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

// var provider = new Firestore.auth.GoogleAuthProvider();
// firebase.initializeApp(firebaseConfig);



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

console.log("asdfasdf")
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const db = getDatabase();

const auth = getAuth(); // Initialize Firebase Authentication


// const auth = firebase.auth(); alt

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
      tags: tags,
      lines: lines,
      page: page
  };
  var user = auth.currentUser
  console.log(user)
  // Use set function to write data to the database
  set(ref(db, 'users/' + user.uid + '/quotes/' + quote), data)
  
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


function register(event){
  event.preventDefault();
  const email = document.getElementById('email').value
  const password = document.getElementById('emailpassword').value

  if (validateemail(email) == false || validatepassword(password) == false) {
    return
  }
  createUserWithEmailAndPassword(auth,email,password)
  
  .then(function() {
    
    var user = auth.currentUser
    // console.log("User:", user); // Check if user object is retrieved correctly

    
    // var database_ref = db.ref();
    
    console.log("here")
    var user_data = {
      email : email,
      last_login : Date.now()
    }
    set(ref(db, 'users/' + user.uid), user_data)
      .then(() => {
          console.log("User added to database");
          // Optionally reset the form here
      })
      .catch((error) => {
        var error_code = error.code
        var error_message = error.message
        //console.error("Error:", error_code, error_message)
       
        
      });
    // database_ref.child('users/' + user.uid).set()

    alert('user created')
  })
  .catch((error) => {
    var error_code = error.code
    var error_message = error.message
    console.log(error_code)
    if (error_code === 'auth/email-already-in-use') {
      // Handle email already in use error here
      alert("account already exists")
      // Display appropriate message to the user
    }
  });
}

function login() {
  event.preventDefault();
  //get input fields

  

  const email = document.getElementById('email').value
  const password = document.getElementById('emailpassword').value
  //validate
  if (validateemail(email) == false || validatepassword(password) == false) {
    return
  }

  console.log("here")
    var user_data = {
      last_login : Date.now()
    }
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User logged in:", user);
    alert('Logged in')
    // Update user data
    update(ref(db, 'users/' + user.uid), user_data)
      .then(() => {
        console.log("User data updated successfully");
        // Optionally reset the form here
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  })
  .catch((error) => {
    // Handle sign-in errors
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-in error:", errorCode, errorMessage);
  });

  // auth.signInWithEmailAndPassword(email,password)
  // .then(function() {
  //   var user = auth.currentUser
  //   var user_data = {
  //     last_login : Date.now()
  //   }

  //   database_ref.child('users/' + user.uid).update(user_data)
  // })
  // .catch((error) => {
  //   var error_code = error.code
  //   var error_message = error.message
  //   console.error("Error:", error_code, error_message);
  // });
}




















function validateemail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
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

document.addEventListener("DOMContentLoaded", function() {
  // This code will execute after all HTML elements have been loaded
  // Put the relevant parts of your JavaScript code here
  // For example:
  
  // Select elements and manipulate the DOM
  
  
  // Attach event listeners
  if (document.getElementById('onregisterclick')) {
    // console.log("check")
    const registerelement = document.getElementById('onregisterclick');
    const formelement = document.getElementById('formtosignup');

    registerelement.addEventListener('click', register);  // Pass the function itself
  } else {
    console.log("register element not found on this page.");
  }

  if (document.getElementById('onloginclick')) {
    // console.log("check")
    const loginelement = document.getElementById('onloginclick');
    loginelement.addEventListener('click', login);

  } else {
    console.log("login element not found on this page.");
  }
  

  // Other DOM-related operations...
});

// Other JavaScript code that doesn't depend on DOM content can go here
// This code will execute immediately without waiting for the DOM to be fully loaded

