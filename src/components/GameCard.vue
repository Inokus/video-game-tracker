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
    class="cover border border-slate-900 rounded-lg overflow-hidden hover:scale-95 duration-200"
    v-if="game.coverUrl !== ''"
  >
    <img :src="game.coverUrl" :alt="`${game.title} cover`" class="h-full w-full object-cover" />
  </div>
  <div
    class="cover relative border border-slate-900 rounded-lg overflow-hidden hover:scale-95 duration-200"
    v-else
  >
    <PhotoIcon class="h-full w-full text-slate-900" />
    <p class="absolute bottom-4 w-full h-16 overflow-hidden text-center">{{ game.title }}</p>
  </div>
</template>

<style scoped>
.cover {
  width: 264px;
  height: 374px;
  cursor: pointer;
}
</style>
