<template>
  <h2 class="text-xl text-left">Create a new plant</h2>
  <form class="w-500px">
    <fieldset class="flex gap-4">
      <input v-model="plant.name" id="name" placeholder="Name" />
      <select v-model="plant.kind" id="kind">
        <option value="rosemary">Rosemary</option>
        <option value="chives">Chives</option>
      </select>
      <select v-model="plant.category" id="category">
        <option value="herbs">Herbs</option>
        <option value="vegetables">Vegetables</option>
      </select>
    </fieldset>
  </form>
  <pre class="text-left"><code>{{ plant }}</code></pre>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const plant = reactive({ name: '', kind: '', category: 'herbs' })
</script>

<style>
input,
select {
  @apply bg-white border-dark-100 border-1;
}
</style>