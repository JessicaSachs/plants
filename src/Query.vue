<template>
  <div v-if="fetching">Loading...</div>

  <div v-else-if="error">Oh no... {{ error }}</div>

  <div v-else>
    <ul v-if="data">
      <li v-for="book of data.app.books">{{ book.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useQuery, gql } from '@urql/vue'
import { GetBooksDocument } from './generated/graphql'

gql`
  query GetBooks {
    app {
      books {
        title
      }
    }
  }
`

const { fetching, data, error } = useQuery({
  query: GetBooksDocument
})

</script>