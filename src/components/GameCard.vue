<script setup lang="ts">
import { PhotoIcon } from '@heroicons/vue/24/outline';

defineProps({
  game: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div
    v-if="game.coverUrl !== ''"
    class="cover border-2 border-slate-950 rounded-lg overflow-hidden"
  >
    <img :src="game.coverUrl" :alt="`${game.title} cover`" class="h-full w-full object-cover" />
  </div>
  <div v-else class="cover relative border-2 border-slate-950 rounded-lg overflow-hidden">
    <PhotoIcon class="h-full w-full text-black" />
    <!-- <img src="../assets/icons/photo.svg" alt="" class="h-full w-full" /> -->
    <p class="absolute bottom-4 w-full h-16 overflow-hidden text-center">{{ game.title }}</p>
  </div>
</template>

<style scoped>
.cover {
  width: 264px;
  height: 374px;
}
</style>
