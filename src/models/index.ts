export * from './planter'
export * from './planter'
import { Feeding, Planter } from './planter'

const ONE_DAY = 1000 * 60 * 60 * 24

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
  name: 'Bounty Elite (1)',
  model: 'Bounty Elite',
  size: 9,
  schedule: [...bountySchedule.map((s) => new Feeding(s))],
})

export const bountyTwo = new Planter({
  name: 'Bounty Elite (2)',
  model: 'Bounty Elite',
  size: 9,
  schedule: [...bountySchedule.map((s) => new Feeding(s))],
})

export const bountyThree = new Planter({
  name: 'Bounty Elite (3)',
  model: 'Bounty Elite',
  size: 9,
  schedule: [...bountySchedule.map((s) => new Feeding(s))],
})

export const kitchenHarvest = new Planter({
  name: 'Harvest 360',
  model: 'Harvest 360',
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
