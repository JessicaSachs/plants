import { nxs, NxsArgs } from 'nexus-decorators'
import { Planter, PlanterDetails } from './Planter'
import { Context } from './Context'

export class App {
  constructor(private ctx: Context) {}

  @nxs.field.nonNull.list.nonNull.type(() => Planter, {
    description: 'All the planters in the garden',
    args(t) {
      t.string('planterId')
    },
  })
  planters(args: { planterId: NxsArgs<'Planter', 'id'> }) {
    return args.planterId
      ? this.ctx.planters.filter((p) => p.id === args.planterId)
      : this.ctx.planters
  }

  addPlanter(input: PlanterDetails) {
    const planter = new Planter(input)
    this.ctx.planters.push(planter)
    return planter
  }
}
