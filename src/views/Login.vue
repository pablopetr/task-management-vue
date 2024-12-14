<script setup lang="ts">
import TextInput from '@/components/input/TextInput.vue'
import { ref } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { login } from '../services/authService.ts';

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    const token = await login(email.value, password.value)

    localStorage.setItem('jwt', token);
  } catch(error) {
    console.log(error);
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <TextInput
        id="email"
        name="email"
        label="Email"
        :modelValue="email"
        @update:modelValue="$event => (email = $event)"
      />
    </div>
    <div class="flex flex-col gap-2">
      <TextInput
        id="password"
        name="password"
        label="Password"
        v-model="password"
        type="password"
        has-error="true"
      />
    </div>

    <SubmitButton @click="handleSubmit">
      Login
    </SubmitButton>
  </form>
</template>

<style scoped>

</style>
