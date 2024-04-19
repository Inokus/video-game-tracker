<script setup lang="ts">
defineProps({
  game: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <img :src="game.coverUrl" alt="" />
</template>
