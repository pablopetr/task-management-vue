<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  class: { type: String, default: '' },
});

const componentClass = computed(() => ({
  'pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end sm:size-4': true,
  'text-gray-300': !props.class,
  [props.class!]: !!props.class,
}));
</script>

<template>
  <svg
    :class="componentClass"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    data-slot="icon"
  >
    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
  </svg>
</template>
