<script setup lang="ts">
import { ArrowUturnLeftIcon } from '@heroicons/vue/24/outline';
import useGamesStore from '../stores/games';
import useOptionsStore from '../stores/options';
import GameDetails from './GameDetails.vue';
import DynamicButton from './DynamicButton.vue';

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
  <DynamicButton
    :ariaLabel="'back'"
    :class="'absolute top-1 left-1 bg-transparent'"
    @click="gamesStore.deselectGame"
  >
    <ArrowUturnLeftIcon class="w-6 h-6" />
  </DynamicButton>
  <div class="flex flex-col justify-center items-center gap-8 w-1/2 h-full mx-auto">
    <GameDetails />
    <form class="flex items-center gap-4" @submit.prevent="handleAddGame" novalidate>
      <div>
        <select
          name="category"
          id="category"
          aria-label="category"
          v-model="optionsStore.selectedCategory"
        >
          <option value="backlog">Backlog</option>
          <option value="completed">Completed</option>
          <option value="wishlist">Wishlist</option>
        </select>
      </div>
      <DynamicButton :type="'submit'"> Add </DynamicButton>
    </form>
  </div>
</template>
