import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCaJWtwMRyBLFHSOfFC5wav-yrasGfeiUc',
  authDomain: 'e-home-242403.firebaseapp.com',
  databaseURL: 'https://e-home-242403.firebaseio.com',
  projectId: 'e-home-242403',
  storageBucket: 'e-home-242403.appspot.com',
  messagingSenderId: '975716232033',
  appId: '1:975716232033:web:6c50b4ba6f3501cd',
};
firebase.initializeApp(firebaseConfig);

export default firebase;
