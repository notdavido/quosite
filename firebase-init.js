// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';

// import { Firestore, getFirestore } from 'firebase/firestore';



import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, set, update, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// import { doc } from 'firebase/firestore';




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

// console.log("asdfasdf")
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const db = getDatabase();

const auth = getAuth(); // Initialize Firebase Authentication
// console.log(auth)

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
      page: page,
      quote: quote
      // quote: quote
  };
  
  if (!auth.currentUser) {
    alert('the site does not support signed out clients yet')
  }

  
  var user = auth.currentUser
  console.log(user)
  // Use set function to write data to the database
  let macookie = getCookie("Project Set");
  set(ref(db, 'users/' + user.uid + '/activeprojects/' + macookie + '/quotes/' + quote), data)
  
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


function setCookie(cookieName, cookieValue) {
  document.cookie = cookieName + "=" + cookieValue + ";path=/";
}

//use Project Set for getting val
function getCookie(cookieName) { ////might need to reorder depending on what might happen
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}


document.addEventListener("DOMContentLoaded", function() {
  // This code will execute after all HTML elements have been loaded
  // Put the relevant parts of your JavaScript code here
  // For example:
  
  // Select elements and manipulate the DOM
  
  
  // Attach event listeners

  const signinpage = document.getElementById('signuppageredirect');
  const loginpage = document.getElementById('loginpageredirect');

  auth.onAuthStateChanged(function(user) {
    
    if (user) {
      if (window.location.href.includes('login.html') || window.location.href.includes('signup.html')) {
        // If the current page is either 'login.html' or 'signup.html', reload the page
        window.location.href = 'landingpage.html';
      }
      if (window.location.href.includes('landingpage.html')) {

        // Retrieve the data once

        const dataRef = ref(db, 'users/' + user.uid + '/activeprojects');
        const topictemplate = document.getElementById('tobedetermined');
        const topicscontainer = document.getElementById("topics-container");

        // function changetopcinformation(instance, iteration) {

        // }

        get(dataRef).then((snapshot) => {
          if (snapshot.exists()) {

            // Data exists at the specified location
            const data = snapshot.val();
            console.log("Data exists:", data);

            let numChildren = 0;
            snapshot.forEach(childSnapshot => {
              
              numChildren++;
              let iteration = numChildren;
              
              // if (numChildren == 1) {


              //   return;
              // }
              console.log("if we want to make real names for the things we would have to check here");

              const clone = topictemplate.cloneNode(true);  
              clone.id = ("topic"+iteration);
              topicscontainer.appendChild(clone); // Append the clone to the topicscontainer

              
              const cloneH3 = clone.querySelector('h3');
              cloneH3.textContent = ('Selection ' + iteration);

              clone.addEventListener("click", function() {
                console.log('click: ' + iteration)
                setCookie('Project Set', iteration); 
                // let newcookie = getCookie('Project Set')
                // console.log(newcookie) //works

                window.location.href = "index.html";
              });
            });
            document.getElementById('tobedetermined').remove(); //redefined instead of variable for consistency
            console.log('delete')



            // object.addEventListener("click", myScript);
          } else {
            // Data doesn't exist at the specified location
            alert("create a dataset with the button below");
          }
        }).catch((error) => {
          console.log("Error getting data:", error);
        });









      }
      if (window.location.href.includes('index.html')) {
        console.log('make sure you add the function that actually displays the quotes you idiot')

        let macookie = getCookie("Project Set"); //cookie for which project
        if (!macookie) {
          alert("Select set to work on");
          window.location.href = "landingpage.html";
        }
        console.log(macookie);
        const forname = ref(db, 'users/' + user.uid + '/activeprojects/' + macookie + '/name');


        const dataRef = ref(db, 'users/' + user.uid + '/activeprojects/' + macookie + '/quotes');

        get(dataRef).then((snapshot) => {
          console.log(dataRef);
          if (snapshot.exists()) {
            let indexedQuotes = {};            
            let numChildren = 0;
            const quoteshowform = document.getElementById("quotetobedetermined");
            const parent = document.getElementById("quotecontainer");

            snapshot.forEach(childSnapshot => { //iteration for each item in project thing
              numChildren++;
              let iteration = numChildren;
              console.log("item: " + iteration + ": " + childSnapshot.key);

              const clone = quoteshowform.cloneNode(true);  
              clone.id = ("quote"+iteration);
              parent.appendChild(clone); // Append the clone to the topicscontainer

              
              const cloneH2 = clone.querySelector('h2');
              cloneH2.textContent = (childSnapshot.key);


              indexedQuotes[iteration] = childSnapshot.val(); //change to include key along with data, dataset inside dataset or smth
            });
            document.getElementById("quotetobedetermined").remove();
            console.log(indexedQuotes); // This will log the indexed quotes object
          }
        });

        get(forname)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Node exists in the database
            const nameValue = snapshot.val();
            console.log("Name:", nameValue);

            let projitem = document.getElementById("myButton");
            projitem.textContent = nameValue;
          } else {
            // Node doesn't exist in the database
            console.log("Name node does not exist in the database.");
          }
        })
        .catch((error) => {
          console.error("Error getting name from the database:", error);
        });

        
        // console.log(dataRef)
      }
    if (signinpage) {
      signinpage.remove();
    }
    loginpage.textContent = "Log Out";

    loginpage.addEventListener('click', function() { //loginpage is actually logout for now
      // Sign out the current user
      auth.signOut().then(() => {
        // Sign-out successful.
        console.log('User signed out');
        // Reload the page
        window.location.reload();
      }).catch((error) => {
        // An error happened.
        console.error('Sign out error:', error);
      });
    });
    } else {
      // User is signed out.
      console.log("User is signed out");
      if (window.location.href.includes('landingpage.html')) {
        alert('you must sign in to use this feature');
      }
      // Your code for signed out user here
    }
  });

    
    
    // loginpage.href = 'new-url.html'; //redirecting the changed login button to logout and new url

  

  if (document.getElementById('onregisterclick')) {
    // console.log("check")
    const registerelement = document.getElementById('onregisterclick');
    const formelement = document.getElementById('formtosignup');

    registerelement.addEventListener('click', register);  // Pass the function itself
  } else {
    // console.log("register element not found on this page.");
  }

  if (document.getElementById('onloginclick')) {
    // console.log("check")
    const loginelement = document.getElementById('onloginclick');
    loginelement.addEventListener('click', login);

    

  } else {
    // console.log("login element not found on this page.");
  }
  

  // Other DOM-related operations...
});

// Other JavaScript code that doesn't depend on DOM content can go here
// This code will execute immediately without waiting for the DOM to be fully loaded

