import { sortBy } from 'lodash'
const ONE_DAY = 1000 * 60 * 60 * 25

// with an array of dates, shift them all by current date
export function shiftDates(byDate: number, dates: Feeding[]) {
  const sortedDates = sortBy(dates, 'nextDate')
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

  newDates.push(
    new Feeding({
      ...current,
      nextDate: byDate + (current.interval || 0),
    })
  )

  return newDates
}

export type PlanterOptions = Pick<Planter, 'name' | 'schedule' | 'size'>

export class Feeding {
  shouldClean: boolean
  feedAmount: number
  interval?: number
  nextDate: number
  times?: number

  constructor(
    options: Pick<Feeding, 'shouldClean' | 'feedAmount' | 'interval' | 'nextDate' | 'times'>
  ) {
    this.shouldClean = options.shouldClean
    this.feedAmount = options.feedAmount
    this.interval = options.interval
    this.nextDate = options.nextDate
    this.times = options.times
  }

  get nextDatePretty() {
    return new Date(this.nextDate).toLocaleDateString()
  }

  get overdue() {
    return Date.now() + ONE_DAY * 2 > this.nextDate
  }
}

export class Planter {
  id = Math.round(Math.random() * 10000)
  schedule: Feeding[]
  name: 'Harvest 360' | 'Bounty Elite'
  size: 6 | 9
  lastFeedDate: number = Date.now()
  startDate: number = Date.now()
  pastFeedings: Feeding[] = []

  constructor(options: PlanterOptions) {
    this.schedule = options.schedule
    this.size = options.size
    this.name = options.name

    // @ts-ignore
    this.lastFeedDate = options.lastFeedDate
    // @ts-ignore
  }

  feed(onDate = Date.now()) {
    this.lastFeedDate = onDate
    this.pastFeedings.push(this.nextFeeding())
    this.schedule = shiftDates(onDate, this.schedule)
  }

  sortByDate() {
    return sortBy(this.schedule, 'nextDate')
  }

  nextFeeding() {
    return this.sortByDate()[0]
  }

  get daysUntilNextFeeding() {
    return Math.round(Math.abs((Date.now() - this.nextFeeding().nextDate) / ONE_DAY))
  }
}
