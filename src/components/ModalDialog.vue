<script setup lang="ts">
import { ref } from 'vue';

const thisModal = ref<HTMLDialogElement | null>(null);

const showModal = () => {
  thisModal.value?.showModal();
};

const closeModal = () => {
  thisModal.value?.close();
};

defineExpose({ showModal, closeModal });
</script>

<template>
  <dialog ref="thisModal">
    <button type="button" @click="closeModal">X</button>
    <slot></slot>
  </dialog>
</template>
