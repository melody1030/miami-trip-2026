import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MoreHorizontal } from 'lucide-react'
import { useDays, useDayItems, useTripInfo } from '../hooks/useItinerary'
import DaySelector from '../components/itinerary/DaySelector'
import DayHero from '../components/itinerary/DayHero'
import ItemCard from '../components/itinerary/ItemCard'
import ItemModal from '../components/itinerary/ItemModal'
import StatusWidget from '../components/itinerary/StatusWidget'
import WeatherStrip from '../components/itinerary/WeatherStrip'
import RouteMapCard from '../components/itinerary/RouteMapCard'
import ToolkitModal from '../components/toolkit/ToolkitModal'

export default function Itinerary() {
  const { days, loading: daysLoading } = useDays()
  const { trip } = useTripInfo()
  const [selectedDayId, setSelectedDayId] = useState(null)
  const { day, loading: dayLoading } = useDayItems(selectedDayId)

  // Modal state
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Toolkit modal state
  const [isToolkitOpen, setIsToolkitOpen] = useState(false)

  useEffect(() => {
    if (days.length > 0 && !selectedDayId) {
      setSelectedDayId(days[0].id)
    }
  }, [days, selectedDayId])

  const handleOpenModal = (item) => {
    setSelectedItem(item)
    // Small delay so the modal renders at scale-90 first, then animates to scale-100
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalOpen(true)
      })
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Wait for close animation to finish before clearing item
    setTimeout(() => setSelectedItem(null), 500)
  }

  if (daysLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400 text-lg font-serif-tc">載入中...</div>
      </div>
    )
  }

  const sortedItems = day?.items
    ? [...day.items].sort((a, b) => a.sortOrder - b.sortOrder)
    : []

  return (
    <>
      {/* Top header */}
      <div className="bg-white/80 backdrop-blur-md pt-3 pb-2 px-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="w-10" />
          <span className="font-serif-tc text-lg tracking-widest font-medium text-slate-800">
            漫漫 ManMan
          </span>
          <button
            className="p-2 -mr-2 rounded-full active:bg-slate-100 transition-colors"
            onClick={() => setIsToolkitOpen(true)}
          >
            <MoreHorizontal size={24} className="text-slate-800" />
          </button>
        </div>

        {/* Day selector */}
        <DaySelector
          days={days}
          selectedId={selectedDayId}
          onSelect={setSelectedDayId}
        />
      </div>

      {/* Content */}
      {day && (
        <div className="pb-8">
          {/* Hero image */}
          <DayHero day={day} />

          {/* Day title (shown when no hero image) */}
          {!day.heroImage && (
            <div className="px-6 mt-6">
              <h1 className="font-serif-tc text-2xl font-bold text-slate-800">
                {day.title}
              </h1>
            </div>
          )}

          {/* Weather forecast strip */}
          <div className="mt-4">
            <WeatherStrip date={day.date} />
          </div>

          {/* Timeline items */}
          <div className="mt-4 px-6">
            {dayLoading ? (
              <div className="text-slate-400 py-10 text-center font-serif-tc">
                載入中...
              </div>
            ) : (
              sortedItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={handleOpenModal}
                />
              ))
            )}
          </div>

          {/* Route map card — at the bottom of all items */}
          <RouteMapCard items={sortedItems} />
        </div>
      )}

      {/* Floating status widget — portaled to app shell so it overlays above scroll */}
      {!isModalOpen && sortedItems.length > 0 && document.getElementById('app-shell') &&
        createPortal(
          <StatusWidget items={sortedItems} onItemClick={handleOpenModal} />,
          document.getElementById('app-shell')
        )
      }

      {/* Centered modal — portaled to app shell for correct positioning */}
      {document.getElementById('app-shell') &&
        createPortal(
          <ItemModal
            item={selectedItem}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />,
          document.getElementById('app-shell')
        )
      }

      {/* Toolkit modal — portaled to app shell */}
      {document.getElementById('app-shell') &&
        createPortal(
          <ToolkitModal
            trip={trip}
            isOpen={isToolkitOpen}
            onClose={() => setIsToolkitOpen(false)}
          />,
          document.getElementById('app-shell')
        )
      }
    </>
  )
}
