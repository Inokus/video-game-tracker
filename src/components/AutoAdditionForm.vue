<script setup lang="ts">
import useGamesStore from '../stores/games';
import useOptionsStore from '../stores/options';
import GameDetails from './GameDetails.vue';

const gamesStore = useGamesStore();
const optionsStore = useOptionsStore();

const game = gamesStore.selectedGame;

const handleAddGame = () => {
  if (game && gamesStore.isNewGame(game)) {
    game.category = optionsStore.selectedCategory;
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
    <select name="category" id="category" v-model="optionsStore.selectedCategory">
      <option value="backlog">Backlog</option>
      <option value="completed">Completed</option>
      <option value="wishlist">Wishlist</option>
    </select>
    <button type="submit">Add</button>
  </form>
</template>
