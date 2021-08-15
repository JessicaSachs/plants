import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import { graphqlSchema } from './schema'
import { Context } from './Context'
import { Book } from './Book'
import cors from 'cors'

const app = express()

class ServerContext extends Context {
  books = [new Book({ title: 'My book', author: 'Me', year: 2017 })]
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
