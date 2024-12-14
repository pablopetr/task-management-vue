<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TextInput from '@/components/input/TextInput.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const store = useStore();
const router = useRouter();

const email = ref('')
const password = ref('')

const isLoading = computed(() => store.state.auth.loading);
const error = computed(() => store.state.auth.error);
const errors = computed(() => store.state.auth.errors);

const handleSubmit = async () => {
  if(isLoading.value) return;

  try {
    await store.dispatch('auth/login', { email: email.value, password: password.value });

    await router.push({ name: 'profile' })
  } catch (err) {
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <TextInput
      id="email"
      name="email"
      label="Email"
      :modelValue="email"
      :errors="errors"
      @update:modelValue="$event => (email = $event)"
    />
    <TextInput
      id="password"
      name="password"
      label="Password"
      v-model="password"
      type="password"
      :errors="errors"
    />
    <div>
      <SubmitButton @click="handleSubmit">
        <div v-if="!isLoading">Login</div>
        <div v-else>Loading...</div>
      </SubmitButton>
    </div>
  </form>
</template>
