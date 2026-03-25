import { initializeApp } from 'firebase/app'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCTqmvLheJjGV_Eo5lScNSlUTi2UxQ8bUY",
  authDomain: "miami-trip0330.firebaseapp.com",
  projectId: "miami-trip0330",
  storageBucket: "miami-trip0330.firebasestorage.app",
  messagingSenderId: "24478429457",
  appId: "1:24478429457:web:1613f051a89e7412839cb0",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function run() {
  await updateDoc(doc(db, 'days', 'day-2'), { title: '🌿 小哈瓦那' })
  console.log('✓ day-2 title updated')

  await updateDoc(doc(db, 'days', 'day-3'), { title: '🎨 Wynwood / Design District' })
  console.log('✓ day-3 title updated')

  process.exit(0)
}

run().catch((err) => { console.error(err); process.exit(1) })
