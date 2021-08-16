<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col select-none">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Name</th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Amount</th>
                <th
                  scope="col"
                  class="w-min text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Next Date</th>

                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Feed</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="planter in planters" :key="planter.id">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-left font-medium text-gray-900"
                >{{ planter.name }}</td>
                <td
                  class="px-6 py-4 rounded whitespace-nowrap text-left text-sm font-semibold text-left space-x-2"
                >
                  <span
                    class="text-pink-800 bg-pink-100 py-2px rounded px-2 text-xs"
                  >{{ planter.nextFeeding.feedAmount }}ml</span>

                  <span
                    v-if="planter.nextFeeding.shouldClean"
                    class="text-indigo-800 bg-indigo-100 py-2px rounded px-2 text-xs"
                  >Clean</span>
                  <span
                    v-if="planter.nextFeeding.times === 1"
                    class="text-yellow-800 bg-yellow-100 py-2px rounded px-2 text-xs"
                  >One-time</span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-500"
                  :class="{
                    'text-red-600': planter.nextFeeding.overdue
                  }"
                >{{ d(new Date(planter.nextFeeding.nextDate)) }}</td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    @click="$emit('click', planter)"
                    class="text-indigo-600 hover:text-indigo-900 cursor-pointer select-none"
                  >Feed</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { GetPlantersQuery } from '~/generated/graphql'

const { d } = useI18n()

defineProps<{
  planters: GetPlantersQuery['app']['planters']
}>()

</script>