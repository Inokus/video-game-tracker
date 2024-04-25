<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import useErrorsStore from '../stores/errors';
import DynamicButton from './DynamicButton.vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  error: {
    type: String,
    required: true
  }
});

const errorsStore = useErrorsStore();

let timeout: number | undefined;

const clearError = () => {
  errorsStore.removeError('internal', props.error);
};

onMounted(() => {
  timeout = setTimeout(() => {
    clearError();
  }, 10000) as unknown as number;
});

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

<template>
  <div class="fixed left-0 bottom-4 right-0 flex justify-center items-center">
    <div class="relative p-4 rounded z-50 bg-red-600 text-slate-50">
      <DynamicButton
        :aria-label="'close'"
        :class="'absolute top-0 right-0 px-0 py-0 bg-transparent shadow-none text-slate-50'"
        @click="clearError"
      >
        <XMarkIcon class="w-4 h-4" />
      </DynamicButton>
      {{ message }}
    </div>
  </div>
</template>
