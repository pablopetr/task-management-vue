<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import Button from '@/components/Button.vue'

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
  <div class="w-full h-screen">
    <nav class="w-full flex justify-between bg-gray-100 p-2">
      <div>
        <RouterLink to="/" exact>Home</RouterLink>
        <RouterLink v-if="user" to="/tasks">Tasks</RouterLink>
      </div>
      <RouterLink v-if="!user" to="/login">Login</RouterLink>
      <Button v-else @click="logout">Logout</Button>
    </nav>
    <RouterView />
  </div>
</template>
