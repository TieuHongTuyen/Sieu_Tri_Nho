import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { DEFAULT_DATA } from '../hooks/useMemoryData';

// Đọc biến từ .env.local đã được load qua --env-file
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log('Bắt đầu đẩy dữ liệu lên Firestore...');
  let i = 0;
  for (const item of DEFAULT_DATA) {
    const docRef = doc(db, 'pao_items', item.number);
    await setDoc(docRef, item);
    i++;
    console.log(`Đã đẩy ${item.number} (${item.imageName})`);
  }
  console.log(`Đã hoàn thành! Đẩy tổng cộng ${i} items.`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Lỗi:', err);
  process.exit(1);
});
