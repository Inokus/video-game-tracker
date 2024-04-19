<script setup lang="ts">
import useGamesStore from '../stores/games';

const gamesStore = useGamesStore();
</script>

<template>
  <div>
    Title: {{ gamesStore.selectedGame?.title }}
    <br />
    Release date: {{ gamesStore.selectedGame?.releaseDate }}
  </div>
</template>
