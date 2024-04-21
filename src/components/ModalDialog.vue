<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['close']);

const modal = ref<HTMLDialogElement | null>(null);

const showModal = () => modal.value?.showModal();

const closeModal = () => {
  modal.value?.close();
  emits('close');
};

defineExpose({ showModal, closeModal });
</script>

<template>
  <dialog ref="modal">
    <button type="button" @click="closeModal">X</button>
    <slot></slot>
  </dialog>
</template>
