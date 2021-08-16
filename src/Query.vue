<template>
  <div></div>
  <!-- <div v-if="fetching">Loading...</div>

  <div v-else-if="error">Oh no... {{ error }}</div>

  <div v-else>
    <ul v-if="data">
      <li v-for="planter in data.app.planters">{{ planter.name }} {{ planter.size }}</li>
    </ul>
  </div>-->
</template>

<script lang="ts" setup>
// import { useQuery, gql } from '@urql/vue'
// import { GetPlantersDocument } from './generated/graphql'

// gql`
//   query GetPlanters {
//     app {
//       planters {
//         name
//         size
//         lastFeedDate
//         schedule {
//           nextDate
//           feedAmount
//           interval
//           shouldClean
//           id
//           times
//         }
//       }
//     }
//   }
// `

// const { fetching, data, error } = useQuery({ query: GetPlantersDocument })

</script>