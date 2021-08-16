import path from 'path'
import { makeSchema } from 'nexus'
import { Query } from './Query'
import { Mutation } from './Mutation'

import { JSONResolver, DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod } from 'nexus'

const customScalars = [
  asNexusMethod(JSONResolver, 'json'),
  asNexusMethod(DateTimeResolver, 'dateTime'),
]

export const graphqlSchema = makeSchema({
  types: [customScalars, Query, Mutation],
  shouldGenerateArtifacts: true,
  shouldExitAfterGenerateArtifacts: Boolean(process.env.GRAPHQL_CODEGEN),
  outputs: {
    typegen: path.join(__dirname, 'gen/nxs.gen.ts'),
    schema: path.join(__dirname, 'schema.graphql'),
  },
  contextType: {
    module: path.join(__dirname, './Context.ts'),
    export: 'Context',
  },
})
