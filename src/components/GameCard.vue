<script setup lang="ts">
defineProps({
  game: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div v-if="game.coverUrl !== ''" class="cover">
    <img :src="game.coverUrl" :alt="`${game.title} cover`" class="image" />
  </div>
  <div v-else class="cover">
    <img src="../assets/icons/photo.svg" alt="" class="icon" />
    <p class="title">{{ game.title }}</p>
  </div>
</template>

<style scoped>
.cover {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 264px;
  height: 374px;
}

.title {
  position: absolute;
  bottom: 1rem;
  width: 100%;
  height: 4rem;
  text-align: center;
  overflow: hidden;
}

.image {
  object-fit: cover;
}

.image,
.icon {
  width: 100%;
  height: 100%;
}
</style>
