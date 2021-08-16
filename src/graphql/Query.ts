import { nxs } from 'nexus-decorators'
import { App } from './App'
import { NexusGenTypes } from './gen/nxs.gen'

@nxs.objectType({
  description: 'Root query',
})
export class Query {
  constructor() {}

  @nxs.field.nonNull.type(() => App)
  app(_: any, ctx: NexusGenTypes['context']) {
    return ctx.app
  }
}
