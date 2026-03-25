import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, CloudDrizzle, CloudSnow, CloudLightning, CloudFog } from 'lucide-react'

// Miami coordinates
const MIAMI_LAT = 25.7617
const MIAMI_LON = -80.1918

const weatherIcons = {
  0: Sun,        // Clear
  1: Sun,        // Mainly clear
  2: Cloud,      // Partly cloudy
  3: Cloud,      // Overcast
  45: CloudFog,  // Fog
  48: CloudFog,  // Rime fog
  51: CloudDrizzle, // Light drizzle
  53: CloudDrizzle, // Moderate drizzle
  55: CloudDrizzle, // Dense drizzle
  61: CloudRain, // Slight rain
  63: CloudRain, // Moderate rain
  65: CloudRain, // Heavy rain
  71: CloudSnow, // Slight snow
  73: CloudSnow, // Moderate snow
  75: CloudSnow, // Heavy snow
  80: CloudRain, // Slight showers
  81: CloudRain, // Moderate showers
  82: CloudRain, // Violent showers
  95: CloudLightning, // Thunderstorm
  96: CloudLightning, // Thunderstorm w/ hail
  99: CloudLightning, // Thunderstorm w/ heavy hail
}

function getIcon(code) {
  return weatherIcons[code] || Cloud
}

export default function WeatherStrip({ date }) {
  const [hourly, setHourly] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!date) return

    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0]

    // Firestore Timestamp
    if (date?.toDate) {
      const d = date.toDate()
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      fetchWeather(`${y}-${m}-${day}`)
    } else {
      fetchWeather(dateStr)
    }
  }, [date])

  const fetchWeather = async (dateStr) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${MIAMI_LAT}&longitude=${MIAMI_LON}&hourly=temperature_2m,weather_code&temperature_unit=celsius&start_date=${dateStr}&end_date=${dateStr}&timezone=America/New_York`
      )
      const data = await res.json()
      if (data.hourly) {
        const hours = data.hourly.time.map((t, i) => ({
          hour: new Date(t).getHours(),
          temp: Math.round(data.hourly.temperature_2m[i]),
          code: data.hourly.weather_code[i],
        }))
        // Show 7am - 11pm
        setHourly(hours.filter((h) => h.hour >= 7 && h.hour <= 23))
      }
    } catch {
      setHourly([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-4 mb-4 bg-slate-50 rounded-2xl px-4 py-3">
        <div className="h-16 flex items-center justify-center">
          <span className="text-xs text-slate-400">載入天氣中...</span>
        </div>
      </div>
    )
  }

  if (hourly.length === 0) return null

  return (
    <div className="mx-4 mb-4 bg-slate-50 rounded-2xl px-3 py-4">
      <div className="flex overflow-x-auto no-scrollbar space-x-6 px-2">
        {hourly.map((h) => {
          const Icon = getIcon(h.code)
          return (
            <div key={h.hour} className="flex flex-col items-center space-y-1.5 shrink-0">
              <span className="text-xs text-slate-400 font-medium">
                {h.hour === 12 ? '12PM' : h.hour > 12 ? `${h.hour - 12}PM` : `${h.hour}AM`}
              </span>
              <Icon size={22} className="text-slate-500" />
              <span className="text-sm font-bold text-slate-700">{h.temp}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
