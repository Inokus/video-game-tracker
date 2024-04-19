<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import useGamesStore from './stores/games';
import GameAddition from './components/GameAddition.vue';

useGamesStore();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/backlog">Backlog</RouterLink>
      <RouterLink to="/completed">Completed</RouterLink>
      <RouterLink to="/wishlist">Wishlist</RouterLink>
    </nav>
    <GameAddition />
  </header>
  <main>
    <RouterView />
  </main>
</template>
