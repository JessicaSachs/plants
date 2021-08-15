<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flow-root">
    <ul class="-mb-8">
      <li v-for="(planter, planterIdx) in planters" :key="planter.name">
        <div class="relative pb-8">
          <span
            v-if="(planterIdx !== planters.length - 1)"
            class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <div class="relative flex space-x-3">
            <div>
              <span
                :class="['h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']"
              >
                <mdi-coffee />
              </span>
            </div>
            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
              <div>
                <p class="text-sm text-gray-500">
                  Content goes in here
                  <a
                    href
                    class="font-medium text-gray-900"
                  >"event target comes in here"</a>
                </p>
              </div>
              <div class="text-right text-sm whitespace-nowrap text-gray-500">
                <time :datetime="new Date().toLocaleString()">Datetime</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  planters: any[]
}>()
</script>