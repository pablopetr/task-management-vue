<script setup lang="ts">
import TextInput from '@/components/input/TextInput.vue'
import { ref } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'

const title = ref('')
const description = ref('')

</script>

<template>
  <div>
    <h1 class="font-bold text-2xl">Create Task</h1>
    <form>
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
