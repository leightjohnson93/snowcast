// import firebase from 'firebase'
import * as firebase from 'firebase/app'

const config = {
  apiKey: 'AIzaSyAX2mUNYbxK9t-naLqgqfgguGDx2AP1bjo',
  authDomain: 'snowcast-d7abb.firebaseapp.com',
  databaseURL: 'https://snowcast-d7abb.firebaseio.com',
  projectId: 'snowcast-d7abb',
  storageBucket: 'snowcast-d7abb.appspot.com',
  messagingSenderId: '36774727092',
}

firebase.initializeApp(config)
export default firebase
