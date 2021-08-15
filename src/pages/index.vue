<script setup lang="ts">
import { reactive, ref } from 'vue'
import { bountyOne, kitchenHarvest } from '../models'

const planters = reactive([
  bountyOne,
  kitchenHarvest
])

const date = ref(Date.now())
</script>

<template>
  <div class="text-center w-500px mx-auto my-0">
    <h1 class="text-3xl">Plants</h1>
    <section
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
    </section>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
