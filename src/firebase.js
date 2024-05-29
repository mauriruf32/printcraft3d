import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
const firebaseConfig = {

  apiKey: "AIzaSyB-M_fyYI9wI4_YbDpeOcxBco7MFsg0ocY",

  authDomain: "printcraft3d-4b677.firebaseapp.com",

  projectId: "printcraft3d-4b677",

  storageBucket: "printcraft3d-4b677.appspot.com",

  messagingSenderId: "97386960988",

  appId: "1:97386960988:web:001d6fc15ae9a6f166ee99",

  measurementId: "G-2V0BL07J4Q"

};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { analytics, auth, database, signInWithPopup, GoogleAuthProvider,ref, set, get };
