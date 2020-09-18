// import 'firebase/auth'
// import 'firebase/firebase-firestore'

// const firebaseConfig = {
//     apiKey: "AIzaSyCnoJyQ99DR8DqjNs5lU3-uG2_jRAv3ksM",
//     authDomain: "zionmusic-767ab.firebaseapp.com",
//     databaseURL: "https://zionmusic-767ab.firebaseio.com",
//     projectId: "zionmusic-767ab",
//     storageBucket: "zionmusic-767ab.appspot.com",
//     messagingSenderId: "895882361330",
//     appId: "1:895882361330:web:313068d3c559816c67936b",
//     measurementId: "G-8ET6PMRJV0"
//   };
//   // Initialize Firebase
//   firebase.analytics();
  
//   class Firebase {
//       constructor() {
//         app.firebase.initializeApp(firebaseConfig);
//         this.auth = app.auth()
//         this.db = app.firestore()  
//       }
    
//       login(email, password) {
//           return this.auth.SignInWithEmailAndPassword(email, password)
//       }

//       logout() {
//           return this.auth.signOut()
//       }

//       async register(name, email, password) {
//           displayName: name
//       }
//   }

//   export default Firebase()