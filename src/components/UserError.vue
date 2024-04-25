<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<template>
  <span class="text-red-600 text-center">
    <slot>{{ message }}</slot>
  </span>
</template>
