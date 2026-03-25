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
  console.log('✓ trip/info')

  // Day 1
  await setDoc(doc(db, 'days', 'day-1'), {
    date: '2026-03-30',
    dayNumber: 1,
    title: '✈️ 抵達邁阿密',
    heroImage: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd1-1', type: 'transit', title: '航班 LGA → MIA', time: '10:59 AM',
        description: 'Flight 981，預計下午 2:07 抵達邁阿密國際機場。飛行時間約 3 小時',
        address: '', sortOrder: 1, highlight: false, notes: ['飛行 3 小時'],
        image: '',
      },
      {
        id: 'd1-2', type: 'transit', title: '搭車前往飯店', time: '2:30 PM',
        description: '從 MIA 機場叫 Uber/Lyft 到 Kimpton Hotel Palomar South Beach，車程約 25 分鐘。下午 4:00 才能 Check-in，可以先寄放行李。',
        address: '1750 Alton Rd, Miami Beach, FL 33139', sortOrder: 2, highlight: false,
        notes: ['車程 25 分鐘', '4PM Check-in'],
        image: '',
      },
      {
        id: 'd1-3', type: 'attraction', title: 'Lincoln Road 散步逛街', time: '4:30 PM',
        description: 'South Beach 最知名的露天步行街，長達 8 個街區，超過 200 間精品店、畫廊與露天咖啡座。由傳奇 Art Deco 建築師 Morris Lapidus 設計，適合傍晚涼爽時來逛。人潮眾多、氣氛很好，是個觀察人群與拍照的絕佳地點！',
        address: 'Lincoln Rd, Miami Beach, FL 33139', sortOrder: 3, highlight: false,
        notes: ['200+商店', '露天步道', '適合拍照'],
        image: 'https://images.unsplash.com/photo-1722460819536-d54fccffc678?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd1-4', type: 'restaurant', title: 'CVI.CHE 105 South Beach', time: '6:30 PM',
        description: '超人氣秘魯海鮮餐廳，Ceviche 是招牌必點！推薦 Causa Traviesa、Lomo Saltado、章魚料理（Pulpo）。調酒也很讚，尤其是經典的 Pisco Sour。位於 Lincoln Road 上，用餐氣氛活潑時尚。建議提早到或預約！',
        address: '1245 Lincoln Rd, Miami Beach, FL 33139', sortOrder: 4, highlight: true,
        notes: ['必點 Ceviche', 'Pisco Sour', '建議預約'],
        image: 'https://images.unsplash.com/photo-1535400255456-984241443b29?q=80&w=600&auto=format&fit=crop',
      },
    ],
  })
  console.log('✓ day-1')

  // Day 2
  await setDoc(doc(db, 'days', 'day-2'), {
    date: '2026-03-31',
    dayNumber: 2,
    title: '🌿 小哈瓦那',
    heroImage: 'https://images.unsplash.com/photo-1548211726-7f93384ec097?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd2-1', type: 'restaurant', title: 'Blue Lavender Cafe & Market', time: '9:00 AM',
        description: 'Miami Beach 的清新早午餐咖啡廳，以有機健康料理聞名。推薦薰衣草拿鐵（Lavender Latte）和巴西莓果碗（Açaí Bowl）。食材新鮮、份量實在，環境舒適，是個很棒的早餐開場！',
        address: '1414 Collins Ave, Miami Beach, FL 33139', sortOrder: 1, highlight: false,
        notes: ['薰衣草拿鐵', '有機健康', '早午餐'],
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd2-2', type: 'restaurant', title: 'Sanguich de Miami', time: '11:30 AM',
        description: '小哈瓦那傳奇古巴三明治名店！2022 年獲得米其林 Bib Gourmand 認證，被譽為「邁阿密最好吃的古巴三明治」。豬肉醃製整整一週，搭配自製火腿、酸黃瓜與芥末醬，夾在現烤麵包裡，外酥內軟、滿嘴噴香。從小貨櫃起家到現在的排隊名店，建議開門就到，通常需等 30 分鐘！',
        address: '2057 SW 8th St, Miami, FL 33135', sortOrder: 2, highlight: true,
        notes: ['米其林推薦', '排隊 30 分鐘', '古巴三明治'],
        image: 'https://plus.unsplash.com/premium_photo-1700677185953-f9473e7e2ba1?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd2-3', type: 'restaurant', title: 'La Colada Gourmet', time: '12:00 PM',
        description: '2016 年在小哈瓦那創立的古巴咖啡專賣店，提供超過 20 種古巴咖啡變化。必喝 Tres Leches 拿鐵（三奶咖啡，濃郁又滑順）和 Havana Vieja。店內還可以看到紅色大型咖啡豆現場烘焙機，香氣四溢！就在 Sanguich 旁邊，吃完三明治直接來一杯。',
        address: '1518 SW 8th St, Miami, FL 33135', sortOrder: 3, highlight: false,
        notes: ['Tres Leches 拿鐵', '現場烘焙', '20+咖啡選擇'],
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd2-4', type: 'attraction', title: 'Calle Ocho 逛逛', time: '1:00 PM',
        description: 'Calle Ocho（SW 8th Street）是小哈瓦那的心臟！街道兩側壁畫繽紛，有公雞雕像、Celia Cruz 壁畫和各種拉丁藝術。必訪 Domino Park 看當地老爺爺們下骨牌，還有手工雪茄店可以看師傅現場捲雪茄。濃濃的拉丁風情，彷彿置身哈瓦那！',
        address: 'Calle Ocho, Miami, FL 33135', sortOrder: 4, highlight: false,
        notes: ['壁畫街', '雪茄體驗', 'Domino Park'],
        image: 'https://images.unsplash.com/photo-1694716429728-0956a334d3e8?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd2-5', type: 'restaurant', title: 'Bachour', time: '3:00 PM',
        description: '由兩度獲選「世界最佳甜點師」（2018 & 2022）的 Antonio Bachour 主理，米其林 Bib Gourmand 認證。甜點櫃美到像藝術品，推薦芒果百香果馬卡龍、開心果可頌、巴黎布丁（Parisian Flan）。每一款都精緻得像高級傢俱，好吃到真的會哭！🍰',
        address: '2020 Salzedo St, Coral Gables, FL 33134', sortOrder: 5, highlight: true,
        notes: ['世界最佳甜點師', '米其林推薦', '必吃可頌'],
        image: 'https://images.unsplash.com/photo-1634560604992-7784a29bc419?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd2-6', type: 'attraction', title: 'LoanDepot Park 外觀打卡 ⚾', time: '6:00 PM',
        description: '邁阿密馬林魚隊的主場館 LoanDepot Park，位於小哈瓦那區。球場外觀現代壯觀，有巨型馬林魚雕塑和棒球主題裝置藝術，非常適合拍照留念。周圍街區也充滿拉丁風情，可以順便散步感受小哈瓦那的傍晚氣氛。',
        address: '501 Marlins Way, Miami, FL 33125', sortOrder: 6, highlight: false,
        notes: ['外觀拍照', '馬林魚雕塑', '免費參觀'],
        image: 'https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?q=80&w=600&auto=format&fit=crop',
      },
    ],
  })
  console.log('✓ day-2')

  // Day 3
  await setDoc(doc(db, 'days', 'day-3'), {
    date: '2026-04-01',
    dayNumber: 3,
    title: '🎨 Wynwood / Design District',
    heroImage: 'https://images.unsplash.com/photo-1548209454-8548045387bc?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd3-1', type: 'attraction', title: 'Wynwood Walls 街頭藝術', time: '10:00 AM',
        description: '邁阿密最具代表性的戶外藝術園區！佔地兩英畝，擁有超過 40 幅大型壁畫、12 座雕塑和 3 間藝廊。部分作品掃 QR code 還會動起來！需購票入場，建議平日早上去避開人潮。開放時間 10:30 AM - 6:30 PM，最後入場為關門前 30 分鐘。注意：不能觸摸或靠在牆上。',
        address: '2520 NW 2nd Ave, Miami, FL 33127', sortOrder: 1, highlight: true,
        notes: ['需購票', '40+壁畫', 'QR 互動'],
        image: 'https://plus.unsplash.com/premium_photo-1693166014741-05064aee4201?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd3-2', type: 'restaurant', title: 'Amara at Paraiso', time: '12:00 PM',
        description: '由 James Beard 得獎主廚 Michael Schwartz 主理的水岸拉丁美食餐廳。必點 Yuca Cheese Puffs（絲蘭起司球）和 Paraiso Seafood Tower（海鮮塔，有龍蝦、生蠔、Ceviche）。建議預約日落時段的戶外座位，海灣景色超級美！雖然價位偏高，但景觀和氣氛絕對值得。',
        address: '3101 NE 7th Ave, Miami, FL 33137', sortOrder: 2, highlight: true,
        notes: ['海景餐廳', '建議預約', '必點海鮮塔'],
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd3-3', type: 'attraction', title: 'Miami Design District', time: '2:00 PM',
        description: '涵蓋 18 個街區的高端藝術與時尚區！除了 Prada、Dior、Fendi 等 120 多間精品店，還有免費的 ICA 當代藝術館和戶外雕塑花園。別錯過 Palm Court 裡 Buckminster Fuller 的「蒼蠅眼穹頂」和德國設計師 Konstantin Grcic 的懸吊椅網裝置。就算不購物，光看建築和公共藝術就很值得！適合散步拍照。',
        address: 'Miami Design District, Miami, FL 33137', sortOrder: 3, highlight: false,
        notes: ['免費藝術館', '120+精品店', '建築拍照'],
        image: 'https://images.unsplash.com/photo-1615663592771-79a204c3ca5b?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd3-4', type: 'attraction', title: 'Kaseya Center 外觀打卡', time: '4:00 PM',
        description: 'NBA 邁阿密熱火隊的主場館！就算沒有比賽也值得在外面拍照留念。球場外觀現代壯觀，周圍也有一些裝置藝術。',
        address: '601 Biscayne Blvd, Miami, FL 33132', sortOrder: 4, highlight: false,
        notes: ['熱火隊主場', '外觀拍照'],
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd3-5', type: 'attraction', title: 'Bayfront Park 看夕陽', time: '5:00 PM',
        description: '位於 Biscayne Bay 旁的海濱公園，是欣賞邁阿密天際線和夕陽的絕佳地點。公園內有噴泉、雕塑和寬敞的步道，非常適合傍晚散步放鬆。免費入場！',
        address: '301 Biscayne Blvd, Miami, FL 33132', sortOrder: 5, highlight: false,
        notes: ['免費入場', '看夕陽', '天際線'],
        image: 'https://images.unsplash.com/photo-1697657997273-57638a993fba?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd3-6', type: 'restaurant', title: 'Bayside Marketplace 晚餐', time: '6:30 PM',
        description: '邁阿密最熱鬧的海濱購物中心，每天都有現場 Live Music 表演！餐廳選擇很多：The Knife 阿根廷燒烤、La Cañita 加勒比古巴料理都很推薦。建議早點到搶海灣景觀的露天座位，一邊吃飯一邊聽音樂看遊艇，超級 chill！🎵',
        address: '401 Biscayne Blvd, Miami, FL 33132', sortOrder: 6, highlight: false,
        notes: ['Live Music', '海景露天座', '多餐廳選擇'],
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop',
      },
    ],
  })
  console.log('✓ day-3')

  // Day 4
  await setDoc(doc(db, 'days', 'day-4'), {
    date: '2026-04-02',
    dayNumber: 4,
    title: '🏝️ Key West 一日遊',
    heroImage: 'https://images.unsplash.com/photo-1741680260581-91a2591f90e0?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd4-1', type: 'transit', title: '開車前往 Key West', time: '7:00 AM',
        description: '早點出發！從邁阿密到 Key West 單程約 4 小時，沿途會經過著名的跨海公路 Overseas Highway，風景絕美。路上會經過 Seven Mile Bridge，是拍照的好地方。建議加滿油再出發，沿途加油站較少。',
        address: 'Key West, FL 33040', sortOrder: 1, highlight: false,
        notes: ['單程 4 小時', '浮淺天堂', '跨海公路'],
        image: '',
      },
      {
        id: 'd4-2', type: 'attraction', title: 'Duval Street', time: '11:00 AM',
        description: 'Key West 最熱鬧的主街，全長約 2 公里，從墨西哥灣一路延伸到大西洋。兩旁滿是特色商店、酒吧和餐廳。必訪海明威最愛的 Sloppy Joe\'s Bar！可以找到吊床、泳衣、手工珠寶和各種 Key West 紀念品。非常適合漫步探索和觀察人群。',
        address: 'Duval St, Key West, FL 33040', sortOrder: 2, highlight: false,
        notes: ['海明威酒吧', '紀念品', '步行街'],
        image: 'https://images.unsplash.com/photo-1580541631950-7282082b53ce?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd4-3', type: 'attraction', title: 'Mallory Square 日落廣場', time: '12:30 PM',
        description: '每天日落前兩小時開始的免費「日落慶典」是 Key West 最經典的體驗！廣場上會有街頭藝人、音樂家、手工藝攤販和美食小販。日落時分整個廣場會擠滿人，一起看太陽沈入墨西哥灣，氣氛超棒！建議傍晚再回來看日落。',
        address: 'Mallory Square, Key West, FL 33040', sortOrder: 3, highlight: true,
        notes: ['免費日落慶典', '街頭藝人', '必看日落'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd4-4', type: 'attraction', title: '最南端地標 🇺🇸', time: '2:00 PM',
        description: '美國本土最南端的地標！這個色彩繽紛的大浮標位於 Whitehead 和 South Street 交叉口，標示著距離古巴僅 90 英里。是 Key West 最熱門的拍照打卡點，幾乎每個遊客都會來。排隊拍照通常需要 10-20 分鐘，但非常值得！',
        address: 'Southernmost Point, Key West, FL 33040', sortOrder: 4, highlight: false,
        notes: ['距古巴 90 英里', '排隊 10-20 分鐘', '必拍打卡'],
        image: 'https://images.unsplash.com/photo-1722480176525-1cefada5037e?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd4-5', type: 'transit', title: '開車返回邁阿密', time: '4:00 PM',
        description: '回程同樣約 4 小時。建議下午 4 點前出發，避免天黑後開跨海公路。回程可以在途中停靠 Islamorada 或 Marathon 休息吃晚餐。',
        address: '1750 Alton Rd, Miami Beach, FL 33139', sortOrder: 5, highlight: false,
        notes: ['避免天黑開車', '可中途休息'],
        image: '',
      },
    ],
  })
  console.log('✓ day-4')

  // Day 5
  await setDoc(doc(db, 'days', 'day-5'), {
    date: '2026-04-03',
    dayNumber: 5,
    title: '🌺 最終日 + 回程',
    heroImage: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=800&auto=format&fit=crop',
    items: [
      {
        id: 'd5-1', type: 'restaurant', title: 'Puerto Sagua Restaurant', time: '9:00 AM',
        description: '自 1962 年開業的經典古巴餐廳，是 Miami Beach 的老字號早餐首選！推薦古巴吐司配奶油（Cuban Toast）、起司歐姆蛋配薯餅。份量大、價格實在（約 $20-30），每道菜都帶著家常料理的溫暖。復古懷舊的裝潢彷彿回到舊時光，服務員熱情親切。🍳',
        address: '700 Collins Ave, Miami Beach, FL 33139', sortOrder: 1, highlight: false,
        notes: ['免訂位', '古巴早餐', '大份量'],
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd5-2', type: 'attraction', title: 'Versace Mansion / Ocean Drive', time: '10:30 AM',
        description: '位於 Ocean Drive 上的傳奇 Casa Casuarina，建於 1930 年，曾是時尚大師 Gianni Versace 的私人豪宅（1992-1997）。現已改為精品飯店，最大亮點是由超過一百萬片馬賽克磁磚（含 24K 金磚）打造的 54 呎長泳池。可以在外面拍照，或進去餐廳 Gianni\'s 用餐體驗奢華氛圍。Ocean Drive 本身也是散步看 Art Deco 建築的好地方。',
        address: '1116 Ocean Dr, Miami Beach, FL 33139', sortOrder: 2, highlight: true,
        notes: ['傳奇豪宅', '24K金泳池', 'Art Deco'],
        image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd5-3', type: 'attraction', title: 'Vizcaya Museum & Gardens 🌿', time: '11:30 AM',
        description: '邁阿密最美的歷史莊園！由工業鉅子 James Deering 於 1916 年建造的義大利文藝復興風格別墅，花園是歐洲宮廷風，被熱帶叢林環繞。必看石船雕塑和海灣景觀。門票 $25/成人，建議提前網路購票避免排隊。開放時間 9:30 AM - 4:30 PM（週二休館）。預計逛約 1.5-2 小時。',
        address: '3251 S Miami Ave, Miami, FL 33129', sortOrder: 3, highlight: true,
        notes: ['門票 $25', '提前購票', '逛 1.5-2 小時'],
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
      },
      {
        id: 'd5-4', type: 'transit', title: '前往機場 ✈️', time: '1:30 PM',
        description: 'Flight 993，下午 4:05 起飛，晚上 7:00 抵達紐約 LGA。建議至少提前 2 小時到機場（1:30 PM 出發）。從 Vizcaya 到 MIA 機場約 20 分鐘車程。記得在機場退還任何租車！邁阿密之旅圓滿結束 🌴',
        address: 'Miami International Airport, Miami, FL 33126', sortOrder: 4, highlight: false,
        notes: ['提前 2 小時', '車程 20 分鐘'],
        image: '',
      },
    ],
  })
  console.log('✓ day-5')

  console.log('\n🌴 所有資料已更新完成！')
  process.exit(0)
}

seed().catch((err) => {
  console.error('更新失敗:', err)
  process.exit(1)
})
