<script setup lang="ts">
import TextInput from '@/components/input/TextInput.vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SubmitButton from '@/components/SubmitButton.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const title = ref('')
const description = ref('')

const errors = computed(() => store.state.tasks.errors)
const task = ref(null)

const taskId = route.params.id

const handleSubmit = async () => {
  if(isLoading.value) return;

  try {
    await store.dispatch('tasks/update', {
      id: taskId,
      user_id: task?.value.user_id,
      title: title.value,
      description: description.value,
    });

    if(!errors.value) {
      await router.push({ name: 'tasks.index' });
    }
  } catch (err) {
    console.log(err);
  }
}

onMounted(async () => {
  try {
    await store.dispatch('auth/fetchUser')

    await store.dispatch('tasks/show', taskId)

    task.value = store.state.tasks.task

    title.value = task.value.title
    description.value = task.value.description
  } catch (err) {
    console.error('Failed to fetch user:', err)
  } finally {
    isLoading.value = false
  }
})

</script>

<template>
  <div>
    <div>
      {{ task }}
    </div>
    <h1 class="font-bold text-2xl">Edit Task</h1>
    <form v-if="task" @submit.prevent="handleSubmit">
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
        <SubmitButton>
          <div v-if="!isLoading">Update Task</div>
          <div v-else>Loading...</div>
        </SubmitButton>
      </div>
    </form>
  </div>
</template>
