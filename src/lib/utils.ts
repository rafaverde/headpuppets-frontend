import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseWordPressDateTime(value: string): Date {
  const [datePart, timePart] = value.split('T')

  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute, second] = timePart.slice(0, 8).split(':').map(Number)

  return new Date(year, month - 1, day, hour, minute, second)
}
