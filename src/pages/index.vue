<script setup lang="ts">
// import { reactive, ref } from 'vue'
// import { bountyOne, bountyThree, bountyTwo, kitchenHarvest } from '../models'
// import PlanterCard from '../components/PlanterCard.vue'
// import NextFeedings from '../components/NextFeedings.vue'

import { gql, useQuery } from '@urql/vue'
import { GetPlantersDocument } from '~/generated/graphql'

gql`
 query GetPlanters {
   app {
     planters {
       id
       name
       size
       lastFeedDate
       nextFeeding {
         nextDate
         feedAmount
         interval
         overdue
         shouldClean
         id
         times
       }
       schedule {
         nextDate
         feedAmount
         overdue
         interval
         shouldClean
         id
         times
       }
     }
   }
 }
`

const { fetching, data, error } = useQuery({ query: GetPlantersDocument })

const planters = computed(() => data.value?.app?.planters)
// const planters = reactive([
//   bountyOne,
//   kitchenHarvest,
//   bountyTwo,
//   bountyThree
// ])

// const date = ref(Date.now())

// const feedThemAll = () => planters.forEach(p => p.feed())

const log = () => { }
</script>

<template>
  <div v-if="fetching">Fetching</div>
  <div v-else-if="error">{{ error }}</div>
  <!-- <div v-else>{{ planters }}</div> -->
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
          <button
            class="text-md text-white bg-indigo-600 rounded px-2 py-1"
            @click="log"
          >Feed them all</button>
        </div>

        <NextFeedings @click="log" :planters="planters" />
      </div>
      <div class="w-full space-y-4">
        <h2 class="text-2xl text-gray-800 text-left">All Planters</h2>
        <ul class="flex flex-wrap gap-6 justify-evenly text-center">
          <PlanterCard v-for="planter in planters" :planter="planter" :key="planter.name" />
        </ul>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
