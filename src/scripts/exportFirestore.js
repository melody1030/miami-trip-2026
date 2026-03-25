import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, getDoc, orderBy, query } from 'firebase/firestore'

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

async function exportData() {
  // Export trip/info
  const tripSnap = await getDoc(doc(db, 'trip', 'info'))
  if (tripSnap.exists()) {
    console.log('=== trip/info ===')
    console.log(JSON.stringify(tripSnap.data(), null, 2))
  }

  // Export all days
  const q = query(collection(db, 'days'), orderBy('dayNumber'))
  const daysSnap = await getDocs(q)
  for (const d of daysSnap.docs) {
    console.log(`\n=== ${d.id} ===`)
    console.log(JSON.stringify(d.data(), null, 2))
  }

  process.exit(0)
}

exportData().catch((err) => { console.error(err); process.exit(1) })
