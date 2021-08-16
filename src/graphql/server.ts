import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import { graphqlSchema } from './schema'
import { Context } from './Context'
import { Planter } from './Planter'
import cors from 'cors'

const ONE_DAY = 1000 * 60 * 60 * 24

const app = express()

export const bountySchedule = [
  {
    times: 1,
    shouldClean: false,
    feedAmount: 8,
    nextDate: new Date().toString(),
  },
  {
    times: 1,
    shouldClean: true,
    feedAmount: 8,
    nextDate: new Date(Date.now() + ONE_DAY * 14).toString(),
  },
  {
    shouldClean: false,
    interval: 28,
    feedAmount: 12,
    nextDate: new Date(Date.now() + ONE_DAY * 28).toString(),
  },
  {
    shouldClean: true,
    interval: 28,
    feedAmount: 12,
    nextDate: new Date(Date.now() + ONE_DAY * (28 + 14)).toString(),
  },
]

export const bountyOne = new Planter({
  name: 'Bounty Elite (1)',
  model: 'bountyelite',
  size: 'nine',
  schedule: bountySchedule,
})

export const bountyTwo = new Planter({
  name: 'Bounty Elite (2)',
  model: 'bountyelite',
  size: 'nine',
  schedule: bountySchedule,
})

export const bountyThree = new Planter({
  name: 'Bounty Elite (3)',
  model: 'bountyelite',
  size: 'nine',
  schedule: bountySchedule,
})

export const kitchenHarvest = new Planter({
  name: 'Harvest 360',
  model: 'harvest360',
  size: 'six',
  schedule: [
    {
      shouldClean: true,
      feedAmount: 8,
      interval: 28,
      nextDate: new Date(Date.now()).toString(),
    },
    {
      shouldClean: false,
      feedAmount: 8,
      interval: 28,
      nextDate: new Date(Date.now() + ONE_DAY * 14).toString(),
    },
  ],
})

class ServerContext extends Context {
  planters = [kitchenHarvest, bountyOne, bountyTwo, bountyThree]
}

const context = new ServerContext()

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP(() => {
    return {
      schema: graphqlSchema,
      context,
      graphiql: true,
    }
  })
)

app.listen(4000, () => {
  console.log('Started server on 4000')
})
