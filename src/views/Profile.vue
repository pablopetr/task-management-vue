<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { me } from '@/services/userService';

const user = ref()

onMounted(async () => {
  const response = await me()

  user.value = response.data
})

</script>

<template>
  <div v-if="user">
    <h1>Hello, {{ user.name }}</h1>
  </div>
</template>

<style scoped>

</style>
