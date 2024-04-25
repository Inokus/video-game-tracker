<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import DynamicButton from './DynamicButton.vue';
import useErrorsStore from '../stores/errors';

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['close']);

const errorsStore = useErrorsStore();

const modal = ref<HTMLDialogElement | null>(null);

const defaultClasses = 'top-2/4 left-2/4 min-w-fit px-8 py-12 rounded';

const showModal = () => {
  errorsStore.removeAllErrors('user');
  errorsStore.removeAllErrors('internal');
  modal.value?.showModal();
};

const closeModal = () => {
  errorsStore.removeAllErrors('user');
  errorsStore.removeAllErrors('internal');
  modal.value?.close();
  emits('close');
};

defineExpose({ showModal, closeModal });
</script>

<template>
  <dialog ref="modal" :class="[defaultClasses, props.class]">
    <DynamicButton
      :aria-label="'close'"
      :class="'absolute top-0 right-0 px-1 py-1 bg-transparent shadow-none text-red-600'"
      @click="closeModal"
    >
      <XMarkIcon class="w-8 h-8" />
    </DynamicButton>
    <slot></slot>
  </dialog>
</template>

<style scoped>
dialog {
  translate: -50% -50%;
  min-width: 280px;
  background-color: #94a3b8;
  color: #0f172a;
}

dialog::backdrop {
  backdrop-filter: blur(2px);
}
</style>
