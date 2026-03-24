import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

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

async function seed() {
  // 行程資訊 + 工具
  await setDoc(doc(db, 'trip', 'info'), {
    title: '2026 春季邁阿密之旅',
    destination: '邁阿密，佛羅里達',
    coverImage: '',
    startDate: '2026-03-30',
    endDate: '2026-04-03',
    flights: [
      {
        direction: 'outbound',
        flightNumber: 'Flight 981',
        departure: { airport: 'LGA', time: '2026-03-30T10:59' },
        arrival: { airport: 'MIA', time: '2026-03-30T14:07' },
        confirmationCode: '',
      },
      {
        direction: 'return',
        flightNumber: 'Flight 993',
        departure: { airport: 'MIA', time: '2026-04-03T16:05' },
        arrival: { airport: 'LGA', time: '2026-04-03T19:00' },
        confirmationCode: '',
      },
    ],
    accommodations: [
      {
        name: 'Kimpton Hotel Palomar South Beach',
        address: '1750 Alton Rd, Miami Beach, FL 33139',
        checkIn: '2026-03-30T16:00',
        checkOut: '2026-04-03T11:00',
        confirmationCode: '',
        phone: '',
      },
    ],
    emergencyContacts: [
      { label: '當地警察', phone: '911' },
      { label: '駐邁阿密台北經文處 (TECO)', phone: '' },
      { label: '旅遊保險', phone: '' },
    ],
  })
  console.log('✓ trip/info 已更新')

  // 第一天 - 3/30 週一 - 抵達日
  await setDoc(doc(db, 'days', 'day-1'), {
    date: '2026-03-30',
    dayNumber: 1,
    title: '✈️ 抵達邁阿密',
    heroImage: 'https://images.unsplash.com/photo-1514369118554-e20d93546b30?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd1-1',
        type: 'transit',
        title: '航班 LGA → MIA',
        time: '10:59 AM',
        description: 'Flight 981，下午 2:07 抵達',
        address: '',
        sortOrder: 1,
      },
      {
        id: 'd1-2',
        type: 'transit',
        title: '搭車前往飯店',
        time: '2:30 PM',
        description: '從 MIA 機場叫車到 Kimpton Hotel，下午 4:00 Check-in',
        address: '1750 Alton Rd, Miami Beach, FL 33139',
        sortOrder: 2,
      },
      {
        id: 'd1-3',
        type: 'attraction',
        title: 'Lincoln Road / South Beach 散步',
        time: '4:30 PM',
        description: '逛街散步，感受邁阿密氣氛',
        address: 'Lincoln Rd, Miami Beach, FL 33139',
        sortOrder: 3,
      },
      {
        id: 'd1-4',
        type: 'restaurant',
        title: 'CVI.CHE 105 South Beach',
        time: '6:30 PM',
        description: '秘魯海鮮餐廳 🐟',
        address: '1906 Collins Ave, Miami Beach, FL 33139',
        sortOrder: 4,
      },
    ],
  })
  console.log('✓ 第一天已更新')

  // 第二天 - 3/31 週二 - 小哈瓦那
  await setDoc(doc(db, 'days', 'day-2'), {
    date: '2026-03-31',
    dayNumber: 2,
    title: '🌿 小哈瓦那 + Bachour + 馬林魚',
    heroImage: 'https://images.unsplash.com/photo-1533760333285-1d0411132e18?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd2-1',
        type: 'restaurant',
        title: 'Blue Lavender Cafe & Market',
        time: '9:00 AM',
        description: '早餐',
        address: '1623 Michigan Ave, Miami Beach, FL 33139',
        sortOrder: 1,
      },
      {
        id: 'd2-2',
        type: 'restaurant',
        title: 'Sanguich',
        time: '11:30 AM',
        description: '古巴三明治名店，開門即到！',
        address: '2057 SW 8th St, Miami, FL 33135',
        sortOrder: 2,
      },
      {
        id: 'd2-3',
        type: 'restaurant',
        title: 'La Colada Gourmet',
        time: '12:00 PM',
        description: '就在旁邊，古巴果昔必喝！',
        address: '2029 SW 8th St, Miami, FL 33135',
        sortOrder: 3,
      },
      {
        id: 'd2-4',
        type: 'attraction',
        title: 'Calle Ocho 逛逛',
        time: '1:00 PM',
        description: '雪茄店、壁畫，小哈瓦那風情',
        address: 'Calle Ocho, Miami, FL 33135',
        sortOrder: 4,
      },
      {
        id: 'd2-5',
        type: 'restaurant',
        title: 'Bachour',
        time: '3:00 PM',
        description: 'Michelin 推薦甜點，「好吃到哭」🍰',
        address: '2020 Salzedo St, Coral Gables, FL 33134',
        sortOrder: 5,
      },
      {
        id: 'd2-6',
        type: 'attraction',
        title: '馬林魚 vs 白襪 ⚾',
        time: '6:40 PM',
        description: 'LoanDepot Park 看棒球',
        address: '501 Marlins Way, Miami, FL 33125',
        sortOrder: 6,
      },
    ],
  })
  console.log('✓ 第二天已更新')

  // 第三天 - 4/1 週三 - Wynwood + Design District
  await setDoc(doc(db, 'days', 'day-3'), {
    date: '2026-04-01',
    dayNumber: 3,
    title: '🎨 Wynwood + Design District + 市中心',
    heroImage: 'https://images.unsplash.com/photo-1544464522-875fbf104332?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd3-1',
        type: 'attraction',
        title: 'Wynwood Walls 街頭藝術',
        time: '10:00 AM',
        description: '戶外街頭藝術與壁畫',
        address: '2520 NW 2nd Ave, Miami, FL 33127',
        sortOrder: 1,
      },
      {
        id: 'd3-2',
        type: 'restaurant',
        title: 'Amara at Paraiso',
        time: '12:00 PM',
        description: '海景網紅餐廳',
        address: '3101 NE 7th Ave, Miami, FL 33137',
        sortOrder: 2,
      },
      {
        id: 'd3-3',
        type: 'attraction',
        title: 'Miami Design District',
        time: '2:00 PM',
        description: '建築 + 品牌逛街',
        address: 'Miami Design District, Miami, FL 33137',
        sortOrder: 3,
      },
      {
        id: 'd3-4',
        type: 'attraction',
        title: 'Kaseya Center 外觀打卡',
        time: '4:00 PM',
        description: '熱火隊主場，拍照留念',
        address: '601 Biscayne Blvd, Miami, FL 33132',
        sortOrder: 4,
      },
      {
        id: 'd3-5',
        type: 'attraction',
        title: 'Bayfront Park 看夕陽',
        time: '5:00 PM',
        description: '海邊散步看夕陽',
        address: '301 Biscayne Blvd, Miami, FL 33132',
        sortOrder: 5,
      },
      {
        id: 'd3-6',
        type: 'restaurant',
        title: 'Bayside Marketplace',
        time: '6:30 PM',
        description: '晚餐 + live music 🎵',
        address: '401 Biscayne Blvd, Miami, FL 33132',
        sortOrder: 6,
      },
    ],
  })
  console.log('✓ 第三天已更新')

  // 第四天 - 4/2 週四 - Key West
  await setDoc(doc(db, 'days', 'day-4'), {
    date: '2026-04-02',
    dayNumber: 4,
    title: '🏝️ Key West 一日遊',
    heroImage: 'https://images.unsplash.com/photo-1580974852861-c381510a43f3?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd4-1',
        type: 'transit',
        title: '開車前往 Key West',
        time: '7:00 AM',
        description: '早點出發！單程約 4 小時車程',
        address: 'Key West, FL 33040',
        sortOrder: 1,
      },
      {
        id: 'd4-2',
        type: 'attraction',
        title: 'Duval Street',
        time: '11:00 AM',
        description: '主街逛逛，商店、酒吧、餐廳',
        address: 'Duval St, Key West, FL 33040',
        sortOrder: 2,
      },
      {
        id: 'd4-3',
        type: 'attraction',
        title: 'Mallory Square',
        time: '12:30 PM',
        description: '著名的日落廣場',
        address: 'Mallory Square, Key West, FL 33040',
        sortOrder: 3,
      },
      {
        id: 'd4-4',
        type: 'attraction',
        title: '最南端地標',
        time: '2:00 PM',
        description: '美國本土最南端，必拍打卡點！',
        address: 'Southernmost Point, Key West, FL 33040',
        sortOrder: 4,
      },
      {
        id: 'd4-5',
        type: 'transit',
        title: '開車返回邁阿密',
        time: '4:00 PM',
        description: '回程約 4 小時',
        address: '1750 Alton Rd, Miami Beach, FL 33139',
        sortOrder: 5,
      },
    ],
  })
  console.log('✓ 第四天已更新')

  // 第五天 - 4/3 週五 - 最終日
  await setDoc(doc(db, 'days', 'day-5'), {
    date: '2026-04-03',
    dayNumber: 5,
    title: '🌺 最終日 + 回程',
    heroImage: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd5-1',
        type: 'restaurant',
        title: 'Puerto Sagua Restaurant',
        time: '9:00 AM',
        description: '經典古巴早餐 🍳',
        address: '700 Collins Ave, Miami Beach, FL 33139',
        sortOrder: 1,
      },
      {
        id: 'd5-2',
        type: 'attraction',
        title: 'Versace Mansion / Ocean Drive',
        time: '10:30 AM',
        description: '外觀打卡拍照',
        address: '1116 Ocean Dr, Miami Beach, FL 33139',
        sortOrder: 2,
      },
      {
        id: 'd5-3',
        type: 'attraction',
        title: 'Vizcaya Museum & Gardens 🌿',
        time: '11:30 AM',
        description: '9:30 開門，預計逛約 1.5 小時',
        address: '3251 S Miami Ave, Miami, FL 33129',
        sortOrder: 3,
      },
      {
        id: 'd5-4',
        type: 'transit',
        title: '前往機場',
        time: '1:30 PM',
        description: 'Flight 993，下午 4:05 起飛 → 晚上 7:00 抵達紐約 LGA',
        address: 'Miami International Airport, Miami, FL 33126',
        sortOrder: 4,
      },
    ],
  })
  console.log('✓ 第五天已更新')

  console.log('\n🌴 所有資料已更新完成！')
  process.exit(0)
}

seed().catch((err) => {
  console.error('更新失敗:', err)
  process.exit(1)
})
