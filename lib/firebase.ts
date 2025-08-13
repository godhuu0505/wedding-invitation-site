import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase App初期化
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore初期化
const db = getFirestore(app);

// Authentication初期化
const auth = getAuth(app);

// 開発環境でエミュレータに接続（一度だけ実行）
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const isEmulatorEnabled = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';
  
  if (isEmulatorEnabled) {
    try {
      // エミュレータ接続は初回のみ実行
      connectFirestoreEmulator(db, 'localhost', 8080);
      connectAuthEmulator(auth, 'http://localhost:9099');
    } catch (error) {
      // エミュレータが既に接続されている場合はエラーを無視
      console.warn('Firebase エミュレータ接続をスキップしました:', error);
    }
  }
}

export { db, auth };

// 結婚式の基本情報
export const WEDDING_INFO = {
  coupleNames: {
    groom: 'Naoto',
    grooomJapanese: '伊藤 尚人',
    bride: 'Yui',
    brideJapanese: '小林 結衣',
  },
  weddingDate: new Date('2025-11-03T14:00:00+09:00'),
  venue: {
    ceremony: {
      name: '式場名（未定）',
      address: '東京都（詳細未定）',
      time: '14:00',
    },
    reception: {
      name: '披露宴会場（未定）',
      address: '東京都（詳細未定）',
      time: '16:00',
    },
  },
  rsvpDeadline: new Date('2025-10-20T23:59:59+09:00'),
};
