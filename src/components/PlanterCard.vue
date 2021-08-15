<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5">
      <h3 class="text-lg leading-6 font-medium text-gray-900">{{ planter.name }}</h3>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-2">
        <div class="sm:col-span-1 children:inline text-left space-x-2" v-for="field in fields">
          <dt class="text-sm font-medium text-gray-500">{{ field.label }}</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ field.value }}</dd>
        </div>
        <div class="sm:col-span-2 border-t-1 pt-5 mt-5">
          <dt class="text-md pb-2 text-left font-normal text-gray-900">Feedings</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
              <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto">
                  <div class="py-2 align-middle inline-block min-w-full">
                    <div class="overflow-hidden border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >Next Date</th>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >Tags</th>
                            <th scope="col" class="relative px-6 py-3">
                              <span class="sr-only">Feed</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <PlanterCardFeeding
                            v-for="feeding in planter.schedule"
                            @click="planter.feed()"
                            :feeding="feeding"
                            :disabled="feeding !== planter.nextFeeding()"
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- </li> -->
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Planter } from '../models'
import { useI18n } from 'vue-i18n'
import PlanterCardFeeding from './PlanterCardFeeding.vue'

const props = defineProps<{
  planter: Planter
}>()

const { d } = useI18n()


const fields = computed(() => ([
  {
    label: 'Date Planted',
    value: d(props.planter.startDate)
  },
  {
    label: 'Next Feeding',
    value: d(props.planter.nextFeeding().nextDate)
  },
  {
    label: '# Pods',
    value: props.planter.size
  }
]))


</script>