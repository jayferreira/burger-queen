import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDkdMle-9UcaCYyycZDmBTUX2O-k_MakHE",
  authDomain: "burger-queen-jf.firebaseapp.com",
  databaseURL: "https://burger-queen-jf.firebaseio.com",
  projectId: "burger-queen-jf",
  storageBucket: "burger-queen-jf.appspot.com",
  messagingSenderId: "893201978524",
  appId: "1:893201978524:web:4330758bdb0f368f"
};

firebase.initializeApp(config);

export default firebase;