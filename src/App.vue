<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import useGamesStore from './stores/games';
import GameAddition from './components/GameAddition.vue';

useGamesStore();
</script>

<template>
  <header class="fixed h-16 w-full z-10 bg-slate-700 text-white">
    <div class="container mx-auto flex justify-between items-center h-full">
      <nav class="flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/backlog">Backlog</RouterLink>
        <RouterLink to="/completed">Completed</RouterLink>
        <RouterLink to="/wishlist">Wishlist</RouterLink>
      </nav>
      <GameAddition />
    </div>
  </header>
  <main class="relative top-16 flex-1 flex flex-col bg-slate-500">
    <RouterView />
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - 4rem);
}
</style>
