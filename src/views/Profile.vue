<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex';
import router from '@/router';

const store = useStore();
const loading = ref(true);
const user = computed(() => store.state.auth.user);

const logout = () => {
  store.dispatch('auth/logout');
  router.push({ name: 'login' });
};

onMounted(async () => {
  try {
    await store.dispatch('auth/fetchUser');
  } catch (err) {
    console.error('Failed to fetch user:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl">User Profile</h1>
    <div>
      <router-link to="/tasks">Tasks</router-link>
    </div>
    <div v-if="loading">
      <p>Loading...</p> <!-- Show loading state -->
    </div>
    <div v-else-if="user">
      <p>{{ user.name }}</p>
      <p>{{ user.email }}</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <p>No user found.</p>
    </div>
  </div>
</template>
