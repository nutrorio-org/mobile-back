import { FirebaseOptions, initializeApp } from 'firebase/app';
import { FIREBASE_APP_ID, FIREBASE_API_KEY } from '../../enviroments';

const config: FirebaseOptions = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'auth.nutrorio.com.br',
  //authDomain: 'oficial-nutrorio.firebaseapp.com',
  projectId: 'oficial-nutrorio',
  storageBucket: 'oficial-nutrorio.appspot.com',
  messagingSenderId: '872271161362',
  appId: FIREBASE_APP_ID,
  measurementId: 'G-44QLYY8T43',
};
export const app = initializeApp(config);
