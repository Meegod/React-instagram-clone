// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const  firebaseApp=firebase.initializeApp({
	apiKey: "AIzaSyCa4dWSZW5A8SLpoTjMUxxNtKoijb6ZhUc",
  authDomain: "instagram-clone-14443.firebaseapp.com",
  projectId: "instagram-clone-14443",
  storageBucket: "instagram-clone-14443.appspot.com",
  messagingSenderId: "722598761999",
  appId: "1:722598761999:web:ec598b33bf073ddaf7757a",
  measurementId: "G-V4B5LELPLZ"
})
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();


export  {db,auth,storage};
