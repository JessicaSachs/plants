import { nanoid } from 'nanoid'
import { nxs } from 'nexus-decorators'

const ONE_DAY = 1000 * 60 * 60 * 25
export interface FeedingDetails {
  id?: string
  shouldClean: boolean
  nextDate: string
  feedAmount: number
  times?: number
  interval?: number
}

@nxs.objectType({
  description: 'Represents a feeding',
})
export class Feeding {
  private _times?: number
  private _interval?: number
  private _nextDate: string = ''
  private _id: string
  constructor(private details: FeedingDetails) {
    this._nextDate = details.nextDate
    this._interval = details.interval
    this._times = details.times
    this._id = details.id || nanoid(8)
  }

  @nxs.field.nonNull.id()
  get id() {
    return this._id
  }

  @nxs.field.nonNull.boolean()
  get shouldClean() {
    return this.details.shouldClean
  }

  @nxs.field.nonNull.string()
  get nextDate() {
    return this._nextDate
  }

  set nextDate(newValue) {
    this._nextDate = newValue
  }

  @nxs.field.nonNull.int()
  get feedAmount() {
    return this.details.feedAmount
  }

  @nxs.field.int()
  get times() {
    return this._times
  }

  set times(newValue) {
    this._times = newValue
  }

  @nxs.field.int()
  get interval() {
    return this._interval
  }

  set interval(newValue) {
    this._interval = newValue
  }

  @nxs.field.nonNull.boolean()
  get overdue() {
    return Date.now() + ONE_DAY * 2 > new Date(this.nextDate).getTime()
  }
}
