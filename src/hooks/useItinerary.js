import { useState, useEffect } from 'react'
import { db } from '../services/firebase'
import { collection, doc, getDoc, getDocs, updateDoc, orderBy, query } from 'firebase/firestore'

export function useTripInfo() {
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoc(doc(db, 'trip', 'info')).then((snap) => {
      if (snap.exists()) setTrip(snap.data())
      setLoading(false)
    })
  }, [])

  return { trip, loading }
}

export function useDays() {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'days'), orderBy('dayNumber'))
    getDocs(q).then((snap) => {
      setDays(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
  }, [])

  return { days, loading }
}

export function useDayItems(dayId) {
  const [day, setDay] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!dayId) return
    setLoading(true)
    getDoc(doc(db, 'days', dayId)).then((snap) => {
      if (snap.exists()) setDay({ id: snap.id, ...snap.data() })
      setLoading(false)
    })
  }, [dayId])

  const updateItems = async (newItems) => {
    await updateDoc(doc(db, 'days', dayId), { items: newItems })
    setDay((prev) => ({ ...prev, items: newItems }))
  }

  return { day, loading, updateItems }
}
