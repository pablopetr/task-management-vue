<script setup lang="ts">

import { computed } from 'vue'
import IconExclamation from '@/components/icons/IconExclamation.vue'

const props = defineProps({
  id: String,
  name: String,
  label: String,
  type: String,
  modelValue: String,
  placeholder: String,
  description: String,
  errors: Object,
});

const emit = defineEmits(['update:modelValue'])
const hasError = computed(() => {
  return props.errors?.errors ? props.errors?.errors[props.name][0] : null;
});

const error = computed(() => {
  return props.errors?.errors[props.name][0]
})

</script>

<template>
  <div>
    <label :for="name" class="block text-sm/6 font-medium text-gray-900">
      {{ label }}
    </label>
    <div class="mt-2">
      <div class="mt-2 grid grid-cols-1">
        <input
          :id="id"
          :type="type"
          :name="name"
          :value="props.modelValue"
          @input="emit('update:modelValue', $event.target.value)"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline
           outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline
           focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          :placeholder="placeholder"
          :aria-describedby="`${name}-description`"
        >
        <IconExclamation v-if="hasError" class="text-red-500" />
      </div>
    </div>
    <div v-if="hasError">
      <p :id="`${name}-error-message`" class="text-sm text-red-500">{{ error }}</p>
    </div>
    <p v-if="description" class="mt-2 text-sm text-gray-500" id="email-description">
      {{ description }}
    </p>
  </div>
</template>
