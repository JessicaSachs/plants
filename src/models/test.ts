import { reactive, Ref } from 'vue'

const ONE_DAY = 1000 * 60 * 60 * 25

export const allDates: { nextDate: number; interval?: number; times?: number }[] = [
  { nextDate: Date.now(), times: 1 },
  { nextDate: Date.now() + ONE_DAY * 14, times: 1 },
  { nextDate: Date.now() + ONE_DAY * 28, interval: ONE_DAY * 28 },
  { nextDate: Date.now() + ONE_DAY * 42, interval: ONE_DAY * 28 },
]

// with an array of dates, shift them all by current date

export function shiftDates(byDate: number, dates: typeof allDates) {
  const sortedDates = dates.sort((a, b) => a.nextDate - b.nextDate)
  const current = sortedDates[0]

  if (current.times) {
    current.times = current.times - 1
  }

  const newDates = [
    ...sortedDates.slice(1).map((d) => {
      const offset = d.nextDate - current.nextDate
      d.nextDate = byDate + offset
      return d
    }),
  ]

  if (typeof current.times === 'number' && current.times <= 0) return newDates

  newDates.push({
    ...current,
    nextDate: byDate + (current.interval || 0),
  })

  return newDates
}
