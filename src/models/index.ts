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
    this.startDate = options.lastFeedDate
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

export class Plant implements PlantType {
  name: string = ''
  startDate? = Date.now()
  planter?: Planter
  height: PlantType['height'] = 0
  gestationPeriod: PlantType['gestationPeriod'] = 0
  kind: PlantType['kind']
  category: PlantType['category']

  constructor(options: Plant) {
    this.name = options.name
    this.kind = options.kind
    this.category = options.category
    this.planter = options.planter
    this.startDate = options.startDate
    this.height = options.height
    this.gestationPeriod = options.gestationPeriod
  }
}

export enum Herbs {
  ROSEMARY,
  THYME,
  CHIVES,
  CILANTRO,
  OREGANO,
  MINT,
  LAVENDAR,
  THAI_BASIL,
  GENOVESE_BASIL,
}

export enum Vegetables {
  ICEBERG_LETTUCE,
  PARIS_ISLAND,
}

export interface PlantType {
  height: number
  gestationPeriod: number
  category?: 'herbs' | 'vegetables'
  name: string
  kind?: Herbs | Vegetables
}

export const bountySchedule = [
  {
    times: 1,
    shouldClean: false,
    feedAmount: 8,
    nextDate: Date.now(),
  },
  {
    times: 1,
    shouldClean: true,
    feedAmount: 8,
    nextDate: Date.now() + ONE_DAY * 14,
  },
  {
    shouldClean: false,
    interval: ONE_DAY * 28,
    feedAmount: 12,
    nextDate: Date.now() + ONE_DAY * 28,
  },
  {
    shouldClean: true,
    interval: ONE_DAY * 28,
    feedAmount: 12,
    nextDate: Date.now() + ONE_DAY * (28 + 14),
  },
]

export const bountyOne = new Planter({
  name: 'Bounty Elite',
  size: 9,
  schedule: [...bountySchedule.map((s) => new Feeding(s))],
})

export const kitchenHarvest = new Planter({
  name: 'Harvest 360',
  size: 6,
  schedule: [
    new Feeding({
      shouldClean: true,
      feedAmount: 8,
      interval: ONE_DAY * 28,
      nextDate: Date.now(),
    }),
    new Feeding({
      shouldClean: false,
      feedAmount: 8,
      interval: ONE_DAY * 28,
      nextDate: Date.now() + ONE_DAY * 14,
    }),
  ],
})
