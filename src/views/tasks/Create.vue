<script setup lang="ts">
import TextInput from '@/components/input/TextInput.vue'
import { computed, onMounted, ref } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { useStore } from 'vuex'
import router from '@/router'

const store = useStore()
const isLoading = ref(false)
const title = ref('')
const description = ref('')

const user = computed(() => store.state.auth.user)
const errors = computed(() => store.state.tasks.errors)

onMounted(async () => {
  try {
    await store.dispatch('auth/fetchUser')
  } catch (err) {
    console.error('Failed to fetch user:', err)
  } finally {
    isLoading.value = false
  }
})

const handleSubmit = async () => {
  if(isLoading.value) return;

  try {
    await store.dispatch('tasks/store', {
      user_id: user.value.id,
      title: title.value,
      description: description.value
    });

    if(!errors.value) {
      await router.push({ name: 'tasks.index' });
    }
  } catch (err) {
    console.log(err);
  }
}

</script>

<template>
  <div>
    <h1 class="font-bold text-2xl">Create Task</h1>
    <form @submit.prevent="handleSubmit">
      <TextInput
        id="title"
        name="title"
        label="Title"
        :modelValue="title"
        @update:modelValue="$event => (title = $event)"
      />
      <TextInput
        id="description"
        name="description"
        label="Description"
        :modelValue="description"
        @update:modelValue="$event => (description = $event)"
      />
      <div class="mt-4">
        <SubmitButton>Create Task</SubmitButton>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
