import { enumType } from 'nexus'
import { nxs, NxsResult } from 'nexus-decorators'
import { Feeding, FeedingDetails } from './Feeding'
import { sortBy } from 'lodash'
import { nanoid } from 'nanoid'

const ONE_DAY = 1000 * 60 * 60 * 24

export interface PlanterDetails {
  id?: string
  name: string
  model: 'harvest360' | 'bountyelite'
  size: 'six' | 'nine'
  lastFeedDate?: string
  startDate?: string
  schedule: FeedingDetails[]
  pastFeedings?: FeedingDetails[]
}

export const PLANTER_SIZES = ['six', 'nine'] as const
export const PLANTER_MODELS = ['harvest360', 'bountyelite'] as const

export type PlanterModels = typeof PLANTER_MODELS[number]
export type PlanterSizes = typeof PLANTER_SIZES[number]

export const PlanterModelsEnum = enumType({
  name: 'PlanterModels',
  members: PLANTER_MODELS,
})

export const PlanterSizesEnum = enumType({
  name: 'PlanterSizes',
  members: PLANTER_SIZES,
})

@nxs.objectType({
  description: 'Represents a planter',
})
export class Planter {
  private _schedule: Feeding[] = []
  private _id: string
  constructor(private details: PlanterDetails) {
    this._schedule = this.details.schedule.map((s) => new Feeding(s))
    this._id = this.details.id || nanoid(10)
  }

  @nxs.field.nonNull.id()
  get id(): NxsResult<'Planter', 'id'> {
    return this._id
  }

  @nxs.field.nonNull.string()
  get name(): NxsResult<'Planter', 'name'> {
    return this.details.name
  }

  @nxs.field.nonNull.type(() => PlanterSizesEnum)
  get size(): NxsResult<'Planter', 'size'> {
    return this.details.size
  }

  @nxs.field.nonNull.type(() => PlanterModelsEnum)
  get model(): NxsResult<'Planter', 'model'> {
    return this.details.model
  }

  @nxs.field.nonNull.string()
  get lastFeedDate(): NxsResult<'Planter', 'lastFeedDate'> {
    return this.details.lastFeedDate || new Date().toString()
  }

  @nxs.field.nonNull.string()
  get startDate(): NxsResult<'Planter', 'startDate'> {
    return this.details.startDate || new Date().toString()
  }

  @nxs.field.nonNull.list.nonNull.type(() => Feeding)
  get schedule(): NxsResult<'Planter', 'schedule'> {
    return this._schedule
  }

  set schedule(newValue) {
    this._schedule = newValue
  }

  @nxs.field.nonNull.type(() => Feeding)
  get nextFeeding() {
    return sortBy(this.schedule, 'nextDate')[0]
  }

  feed(byDate?: string) {
    byDate = byDate || new Date(Date.now()).toString()
    this._schedule = shiftDates(new Date(byDate).getTime(), this._schedule)
    return this
  }
}

export function shiftDates(byDate: number, dates: Feeding[]) {
  const sortedDates = sortBy(dates, 'nextDate')
  const current = sortedDates[0]
  if (current.times) {
    current.times = current.times - 1
  }
  const newDates = [
    ...sortedDates.slice(1).map((d) => {
      const offset = new Date(d.nextDate).getTime() - new Date(current.nextDate).getTime()
      d.nextDate = new Date(byDate + offset).toString()
      return d
    }),
  ]
  if (typeof current.times === 'number' && current.times <= 0) return newDates

  newDates.push(
    new Feeding({
      feedAmount: current.feedAmount,
      id: current.id,
      shouldClean: current.shouldClean,
      interval: current.interval,
      nextDate: new Date(byDate + (current.interval ? current.interval * ONE_DAY : 0)).toString(),
    })
  )
  return newDates
}
