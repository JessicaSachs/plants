<script setup lang="ts">
import { reactive, ref } from 'vue'
import { bountyOne, kitchenHarvest } from '../models'
import PlanterCard from '../components/PlanterCard.vue'

const planters = reactive([
  bountyOne,
  kitchenHarvest
])

const date = ref(Date.now())
</script>

<template>
  <div class="text-center w-full">
    <div class="bg-cyan-100 p-12 pb-24 sm:p-6 sm:pb-8 shadow-xs text-left">
      <h1 class="text-4xl bg-cyan-100 text-center text-cyan-700">Planters</h1>
    </div>
    <div class="w-full h-full -mt-12 px-2 pb-12 sm:pb-2 sm:-mt-2 sm:px-2">
      <!-- <Planters :planters="planters"></Planters> -->
      <ul class="grid gap-6 sm:justify-center md:grid-flow-col-dense">
        <PlanterCard v-for="planter in planters" :planter="planter" :key="planter.name" />
      </ul>
    </div>
    <!-- <section
      v-for="planter in planters"
      class="max-w-500px my-0 mx-auto flex flex-col gap-4 divide-gray-500"
    >
      <h2 class="text-xl">{{ planter.name }}</h2>
      <p>Days until next feeding: {{ planter.daysUntilNextFeeding }}</p>
      <table class="mx-auto my-0">
        <thead>
          <th>Date</th>
          <th>Feed amount</th>
          <th>Clean</th>
        </thead>
        <tbody>
          <tr v-for="feeding in planter.sortByDate()">
            <td>{{ feeding.nextDatePretty }}</td>
            <td>{{ feeding.feedAmount }}ml</td>
            <td>{{ feeding.shouldClean }}</td>
          </tr>
        </tbody>
      </table>

      <button
        class="p-2 max-w-120px text-white rounded hover:bg-emerald-400 bg-emerald-500 border-1 border-emerald-400"
        @click="planter.feed(new Date(date || Date.now()).getTime())"
      >Feed</button>
    </section>-->
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
