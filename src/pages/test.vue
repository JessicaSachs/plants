<script setup lang="ts">
import Query from '../Query.vue'
import Mutation from '../Mutation.vue'
import { createClient, provideClient } from '@urql/vue'

const client = createClient({
  url: 'http://localhost:4000/graphql'
})

provideClient(client)

</script>

<template>
  <Query />
  <Mutation />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
