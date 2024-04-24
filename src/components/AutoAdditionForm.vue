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
    :aria-label="'back'"
    :class="'absolute top-0 left-0 px-2 py-2 bg-transparent shadow-none'"
    @click="gamesStore.deselectGame"
  >
    <ArrowUturnLeftIcon class="w-6 h-6" />
  </DynamicButton>
  <div class="flex flex-col justify-center items-center md:w-3/4 lg:w-2/3 h-full mx-auto">
    <div class="overflow-auto">
      <GameDetails />
      <form class="grid grid-cols-3 gap-4 w-full mt-4" @submit.prevent="handleAddGame" novalidate>
        <label for="category" class="font-bold">Category:</label>
        <select
          name="category"
          id="category"
          class="col-span-2"
          v-model="optionsStore.selectedCategory"
        >
          <option value="backlog">Backlog</option>
          <option value="completed">Completed</option>
          <option value="wishlist">Wishlist</option>
        </select>
        <DynamicButton :type="'submit'" :class="'col-start-2 col-end-3 bg-sky-500 text-slate-900'"
          >Add</DynamicButton
        >
      </form>
    </div>
  </div>
</template>
