import { inputObjectType, mutationType, nonNull, list } from 'nexus'
import { Planter } from './Planter'

export const Mutation = mutationType({
  definition(t) {
    t.field('feedPlanter', {
      type: nonNull(list(nonNull('Planter'))),
      description: 'Feed the planter on a specific date',
      args: {
        input: inputObjectType({
          name: 'PlanterFeedInput',
          definition(t) {
            t.string('date')
            t.string('planterId')
          },
        }),
      },
      resolve(_, args, ctx): any {
        const planters = args.input?.planterId
          ? ctx.planters.filter((p: Planter) => p.id === args.input.planterId)
          : ctx.planters

        planters.map((p: Planter) => {
          p.feed()
          return p
        })

        return planters
      },
    })
  },
})
