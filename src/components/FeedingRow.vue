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
          <div class="text-sm font-medium text-gray-900">{{ d(new Date(feeding.nextDate)) }}</div>
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
      <Badge v-if="feeding.times" class="bg-yellow-100 text-yellow-800">One-time</Badge>
      <Badge
        :class="{
          'text-green-800 bg-green-100': !feeding.overdue,
          'bg-red-100 text-red-800': feeding.overdue
        }"
      >{{ feeding.overdue ? 'Overdue' : 'Upcoming' }}</Badge>
      <Badge class="text-blue-800 bg-blue-100">Clean</Badge>
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
import Badge from '~/components/Badge.vue'
import { useI18n } from 'vue-i18n'

const { d } = useI18n()
defineProps<{
  feeding: GetPlantersQuery['app']['planters'][0]['schedule'][0]
  disabled: boolean
}>()
</script>