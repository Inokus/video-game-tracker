<script setup lang="ts">
import { ref } from 'vue';
import { ArrowUturnLeftIcon } from '@heroicons/vue/24/outline';
import useGamesStore from '../stores/games';
import useErrorsStore from '../stores/errors';
import GameDetails from './GameDetails.vue';
import DynamicButton from './DynamicButton.vue';
import UserError from './UserError.vue';
import InternalError from './InternalError.vue';
import type { Category } from '../types/index';

const gamesStore = useGamesStore();
const errorsStore = useErrorsStore();

const selectedCategory = ref<Category>('backlog');

const handleBack = () => {
  errorsStore.removeAllErrors('user');
  gamesStore.deselectGame();
};

const handleAddGame = async () => {
  if (gamesStore.selectedGame) {
    errorsStore.removeAllErrors('user');

    if (!gamesStore.isNewGame(gamesStore.selectedGame)) {
      errorsStore.addError('user', 'gameExists');
      return;
    }

    errorsStore.currentSource = 'autoAddition';
    gamesStore.selectedGame.category = selectedCategory.value;
    gamesStore.addGame(gamesStore.selectedGame);

    await setTimeout(() => {}, 0);

    if (errorsStore.isActiveError('internal', 'updatingStorage')) {
      gamesStore.removeGame(gamesStore.selectedGame.title);
    } else {
      gamesStore.deselectGame();
    }
  }
};
</script>

<template>
  <DynamicButton
    :aria-label="'back'"
    :class="'absolute top-0 left-0 px-2 py-2 bg-transparent shadow-none'"
    @click="handleBack"
  >
    <ArrowUturnLeftIcon class="w-6 h-6" />
  </DynamicButton>
  <div class="flex flex-col justify-center items-center md:w-3/4 lg:w-2/3 h-full mx-auto">
    <div class="overflow-auto">
      <GameDetails />
      <form class="grid grid-cols-3 gap-4 w-full mt-4" @submit.prevent="handleAddGame" novalidate>
        <label for="category" class="font-bold">Category:</label>
        <select name="category" id="category" class="col-span-2" v-model="selectedCategory">
          <option value="backlog">Backlog</option>
          <option
            value="completed"
            v-if="
              gamesStore.selectedGame?.releaseDate &&
              new Date(gamesStore.selectedGame.releaseDate) <= gamesStore.currentDate
            "
          >
            Completed
          </option>
          <option value="wishlist">Wishlist</option>
        </select>
        <p class="col-span-full text-center">
          <UserError
            :message="'Game with this title already exists.'"
            :error="'gameExists'"
            v-if="errorsStore.isActiveError('user', 'gameExists')"
          />
        </p>
        <DynamicButton :type="'submit'" :class="'col-start-2 col-end-3 bg-sky-500 text-slate-900'"
          >Add</DynamicButton
        >
      </form>
      <InternalError
        :message="'Internal error has occured when updating local storage data.'"
        :error="'updatingStorage'"
        v-if="
          errorsStore.isActiveError('internal', 'updatingStorage') &&
          errorsStore.currentSource === 'autoAddition'
        "
      />
    </div>
  </div>
</template>
