<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TextInput from '@/components/input/TextInput.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const store = useStore();
const router = useRouter();

const email = ref('pabloeliezer@hotmail.com')
const password = ref('password')

const isLoading = computed(() => store.state.auth.loading);
const error = computed(() => store.state.auth.error);

const handleSubmit = async () => {
  if(isLoading.value) return;

  try {
    await store.dispatch('auth/login', { email: email.value, password: password.value });

    await router.push({ name: 'profile' })
  } catch (err) {
    console.log(err);
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
      <div v-if="!isLoading">Submit</div>
      <div v-else>Loading...</div>
    </SubmitButton>
  </form>
</template>
