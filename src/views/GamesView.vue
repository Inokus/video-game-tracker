<script setup lang="ts">
const props = defineProps({
  category: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div>{{ props.category }}</div>
</template>
