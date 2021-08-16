<template>
  <tr :class="{
    'select-none children:select-none opacity-25': disabled,
  }">
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 items-center">
          <mdi-flower class="w-full h-full self-center text-xl" />
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">{{ feeding.nextDate }}</div>
          <div class="text-sm text-gray-500 text-left">{{ feeding.feedAmount }}ml</div>
        </div>
      </div>
    </td>
    <td
      class="px-6 py-4 whitespace-nowrap text-left space-x-1"
      :class="{
        'select-none': disabled
      }"
    >
      <span
        v-if="feeding.times"
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
      >{{ feeding.times === 1 ? 'One-time' : '' }}</span>
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800 bg-green-100"
        :class="{
          'bg-red-100 text-red-800': feeding.overdue
        }"
      >{{ feeding.overdue ? 'Overdue' : 'Upcoming' }}</span>

      <span
        v-if="feeding.shouldClean"
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-800 bg-blue-100"
      >Clean</span>
    </td>
    <td
      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
      :class="{
        'pointer-events-none select-none': disabled,
      }"
    >
      <button
        :disabled="disabled"
        @click="$emit('click')"
        class="text-indigo-600 hover:text-indigo-900"
      >Feed</button>
    </td>
  </tr>
</template>

<script lang="ts">import { GetPlantersQuery } from '~/generated/graphql'

export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
// import type { Feeding } from '../models/'
// import { useI18n } from 'vue-i18n'

// const { d } = useI18n()
defineProps<{
  feeding: GetPlantersQuery['app']['planters'][0]['schedule'][0]
  disabled: boolean
}>()
</script>