<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TextInput from '@/components/input/TextInput.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const store = useStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const isLoading = computed(() => store.state.auth.loading)
const errors = computed(() => store.state.auth.errors)

const handleSubmit = async () => {
  if(isLoading.value) return;

  try {
    const response = await store.dispatch('auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    })

    if(!response.errors) {
      await router.push({ name: 'login' })
    }
  } catch (err) {

  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <TextInput
      id="name"
      name="name"
      label="Name"
      :modelValue="name"
      :errors="errors"
      @update:modelValue="$event => (name = $event)"
    />
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
      type="password"
      :modelValue="password"
      :errors="errors"
      @update:modelValue="$event => (password = $event)"
    />
    <TextInput
      id="password_confirmation"
      name="password_confirmation"
      label="Confirm Password"
      type="password"
      :modelValue="passwordConfirmation"
      :errors="errors"
      @update:modelValue="$event => (passwordConfirmation = $event)"
    />
    <div>
      <SubmitButton @click="handleSubmit">
        <div v-if="!isLoading">Register</div>
        <div v-else>Loading...</div>
      </SubmitButton>
    </div>
  </form>
</template>
