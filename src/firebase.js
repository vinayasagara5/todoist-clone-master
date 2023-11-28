import firebase from 'firebase/app';
import 'firebase/firestore';

export const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyAHdOKiPBEJYiDxxBLeVHa2exir581kRpc',
  authDomain: 'todoist-clone-c9fc1.firebaseapp.com',
  databaseURL: 'https://todoist-clone-c9fc1.firebaseio.com',
  projectId: 'todoist-clone-c9fc1',
  storageBucket: 'todoist-clone-c9fc1.appspot.com',
  messagingSenderId: '485411813808',
  appId: '1:485411813808:web:d504f13f2ae6755b55fe75',
});

export { firebaseConfig as firebase };
