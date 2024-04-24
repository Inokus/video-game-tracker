<script setup lang="ts">
import useGamesStore from '../stores/games';

const gamesStore = useGamesStore();

const game = gamesStore.selectedGame;
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <h1 class="col-span-full text-2xl font-bold text-center">
      {{ game?.title }}
    </h1>

    <span class="font-bold">Release Date:</span>
    <span class="col-span-2">{{ game?.releaseDate || 'no data' }}</span>

    <span class="font-bold">Genres:</span>
    <span class="col-span-2">{{ game?.genres.join(', ') || 'no data' }}</span>

    <span class="font-bold">Platforms:</span>
    <span class="col-span-2">{{ game?.platforms.join(', ') || 'no data' }}</span>

    <span class="font-bold">Summary:</span>
    <span class="col-span-2">{{ game?.summary || 'no data' }}</span>

    <span class="font-bold">User Rating:</span>
    <span class="col-span-2">{{ game?.userRating || 'no data' }}</span>

    <span class="font-bold">Critic Rating:</span>
    <span class="col-span-2">{{ game?.criticRating || 'no data' }}</span>
  </div>
</template>
