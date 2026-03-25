import { Camera, Utensils, Car } from 'lucide-react'

export const CARD_STYLES = {
  attraction: {
    label: '景點',
    iconComponent: Camera,
    bg: 'bg-slate-50',
    hoverBg: 'hover:bg-slate-100',
  },
  restaurant: {
    label: '餐廳',
    iconComponent: Utensils,
    bg: 'bg-slate-50',
    hoverBg: 'hover:bg-slate-100',
  },
  transit: {
    label: '交通',
    iconComponent: Car,
    bg: 'bg-slate-50',
    hoverBg: 'hover:bg-slate-100',
  },
}

export const EXPENSE_CATEGORIES = ['food', 'transport', 'shopping', 'activity', 'other']

export const CURRENCIES = ['USD', 'TWD']
