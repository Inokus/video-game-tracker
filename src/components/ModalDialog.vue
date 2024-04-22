<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import DynamicButton from './DynamicButton.vue';

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['close']);

const modal = ref<HTMLDialogElement | null>(null);

const defaultClasses = 'top-2/4 left-2/4 px-8 py-12 rounded';

const showModal = () => modal.value?.showModal();

const closeModal = () => {
  modal.value?.close();
  emits('close');
};

defineExpose({ showModal, closeModal });
</script>

<template>
  <dialog ref="modal" :class="[defaultClasses, props.class]">
    <DynamicButton
      :ariaLabel="'close'"
      :class="'absolute top-1 right-1 bg-transparent text-red-700'"
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
}

dialog::backdrop {
  backdrop-filter: blur(2px);
}
</style>
