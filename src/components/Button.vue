<template>
  <button
    :class="{
      'underline self-end text-indigo-600 hover:text-indigo-500 text-sm': variant === 'text',
      'py-1 px-2 bg-indigo-600 focus:ring-1 focus:ring-offset-1 focus:ring-indigo-600 hover:bg-indigo-500 text-white rounded text-sm': variant === 'primary'
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  variant?: 'text' | 'primary' | 'outline'
}>(), {
  variant: 'primary'
})
</script>