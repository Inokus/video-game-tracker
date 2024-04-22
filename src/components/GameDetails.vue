<script setup lang="ts">
import useGamesStore from '../stores/games';

const gamesStore = useGamesStore();

const game = gamesStore.selectedGame;
</script>

<template>
  <div class="flex flex-col">
    <span> Title: {{ game?.title }} </span>
    <span> Release date: {{ game?.releaseDate }} </span>
    <span> Genres: {{ game?.genres.join(', ') }} </span>
    <span> Platforms: {{ game?.platforms.join(', ') }} </span>
    <span> Summary: {{ game?.summary }} </span>
    <span> User rating: {{ game?.userRating || '' }} </span>
    <span> Critic rating: {{ game?.criticRating || '' }} </span>
  </div>
</template>
