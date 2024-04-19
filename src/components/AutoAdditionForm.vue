<script setup lang="ts">
import { ref } from 'vue';
import type { Category } from '../types/index';
import useGamesStore from '../stores/games';
import GameDetails from './GameDetails.vue';

const gamesStore = useGamesStore();

const game = gamesStore.selectedGame;
const selectedCategory = ref<Category>('backlog');

const handleAddGame = () => {
  if (game && gamesStore.isNewGame(game)) {
    game.category = selectedCategory.value;
    gamesStore.addGame(game);
    gamesStore.deselectGame();
  }
};
</script>

<template>
  <button type="button" @click="gamesStore.deselectGame">Back</button>
  <GameDetails />
  <form @submit.prevent="handleAddGame" novalidate>
    <label for="category">Category</label>
    <select name="category" id="category" v-model="selectedCategory">
      <option value="backlog">Backlog</option>
      <option value="completed">Completed</option>
      <option value="wishlist">Wishlist</option>
    </select>
    <button type="submit">Add</button>
  </form>
</template>
