<script setup lang="ts">
import { gql, useQuery, useMutation } from '@urql/vue'
import { GetPlantersDocument, PlanterFeedDocument } from '~/generated/graphql'
import Button from '~/components/Button.vue'

gql`
 query GetPlanters {
   app {
     planters {
       ...PlanterDetails
       nextFeeding {
         ...FeedingCardDetails
       }
       schedule {
         ...FeedingCardDetails
       }
     }
   }
 }
`
gql`
fragment PlanterDetails on Planter {
  startDate
  id
  name
  size
  lastFeedDate
}
`

const { fetching, data, error } = useQuery({ query: GetPlantersDocument })

const planters = computed(() => data.value?.app?.planters)
const app = computed(() => data.value?.app)

gql`
mutation PlanterFeed($input: PlanterFeedInput) {
  feedPlanter(input: $input) {
    id
    name
    schedule {
      id
      nextDate
      shouldClean
    }
  }
}
`

const mutation = useMutation(PlanterFeedDocument)

const feedThemAll = (id?: string) => {
  const date = new Date().toString()

  if (id) {
    mutation.executeMutation({ input: { date, planterId: id } })
    return
  }

  // @ts-ignore
  mutation.executeMutation()
}

</script>

<template>
  <div v-if="fetching">Fetching</div>
  <div v-else-if="error">{{ error }}</div>
  <div class="text-center max-w-1200px mx-auto my-0" v-else>
    <div
      class="p-2 py-12 border-b-1 pb-6 mb-12 sm:p-2 sm:pb-8 shadow-xs text-left flex justify-between"
    >
      <h1 class="text-3xl text-center text-indigo-600">Hurlbut Garden</h1>
    </div>
    <div
      class="w-full h-full px-2 pb-12 sm:pb-2 sm:-mt-2 sm:px-2 space-y-12 max-w-1200px mx-auto my-0"
    >
      <div class="w-full space-y-4 max-w-700px">
        <div class="flex justify-between">
          <h2 class="text-2xl text-gray-800">Upcoming feedings</h2>
          <Button @click="feedThemAll()">Feed them all</Button>
        </div>

{{ app?.planters?.length }}
        <NextFeedings v-if="app?.planters" @feed="feedThemAll($event.id)" :gql="app" />
      </div>
      <div class="w-full space-y-4">
        <h2 class="text-2xl text-gray-800 text-left">All Planters</h2>
        <ul class="flex flex-wrap gap-6 justify-evenly text-center">
          <PlanterCard
            @feed="feedThemAll($event.id)"
            v-for="planter in planters"
            :planter="planter"
            :key="planter.name"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
