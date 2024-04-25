<script setup lang="ts">
import { ref } from 'vue';
import type { Game } from '../types/index';
import useGamesStore from '../stores/games';
import useErrorsStore from '../stores/errors';
import DynamicButton from './DynamicButton.vue';
import UserError from './UserError.vue';
import InternalError from './InternalError.vue';

const gamesStore = useGamesStore();
const errorsStore = useErrorsStore();

const initialFormData: Game = {
  title: '',
  releaseDate: '',
  genres: [],
  platforms: [],
  summary: '',
  userRating: 0,
  criticRating: 0,
  coverUrl: '',
  category: 'backlog',
  manualEntry: true
};

const activeFormData = ref({ ...initialFormData });

const genresInput = ref('');
const platformsInput = ref('');

const formatData = (): void => {
  const newData = { ...activeFormData.value };
  newData.genres = genresInput.value.split(',').map(genre => genre.trim());
  newData.platforms = platformsInput.value.split(',').map(platform => platform.trim());
  activeFormData.value = newData;
};

const resetForm = () => {
  activeFormData.value = { ...initialFormData };
  genresInput.value = '';
  platformsInput.value = '';
};

const hasActiveErrors = (): boolean => {
  formatData();
  errorsStore.removeAllErrors('user');

  if (!gamesStore.isNewGame(activeFormData.value)) {
    errorsStore.addError('user', 'gameExists');
    return true;
  }

  if (activeFormData.value.title.length < 2) {
    errorsStore.addError('user', 'shortTitle');
    return true;
  }

  if (activeFormData.value.userRating < 0) {
    errorsStore.addError('user', 'negativeUserRating');
    return true;
  }

  if (activeFormData.value.userRating > 100) {
    errorsStore.addError('user', 'highUserRating');
    return true;
  }

  if (activeFormData.value.criticRating < 0) {
    errorsStore.addError('user', 'negativeCriticRating');
    return true;
  }

  if (activeFormData.value.criticRating > 100) {
    errorsStore.addError('user', 'highCriticRating');
    return true;
  }

  if (
    activeFormData.value.releaseDate &&
    new Date(activeFormData.value.releaseDate) > gamesStore.currentDate &&
    activeFormData.value.category === 'completed'
  ) {
    errorsStore.addError('user', 'futureReleaseCompleted');
    return true;
  }
  return false;
};

const handleAddGame = async () => {
  if (hasActiveErrors()) return;

  errorsStore.currentSource = 'manualAddition';
  gamesStore.addGame(activeFormData.value);

  await setTimeout(() => {}, 0);

  if (errorsStore.isActiveError('internal', 'updatingStorage')) {
    gamesStore.removeGame(activeFormData.value.title);
  } else {
    resetForm();
  }
};
</script>

<template>
  <div class="w-full md:w-3/4 lg:w-2/3 h-full mb-12">
    <form class="grid grid-cols-1 sm:grid-cols-3 gap-4" @submit.prevent="handleAddGame" novalidate>
      <label for="title" class="text-center sm:text-left">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        autocomplete="off"
        required
        placeholder="Baldur's Gate 3"
        class="sm:col-span-2 h-8 px-4 rounded bg-slate-200"
        v-model="activeFormData.title"
      />
      <p class="col-span-full text-center">
        <UserError
          :message="'Game with this title already exists.'"
          :error="'gameExists'"
          v-if="errorsStore.isActiveError('user', 'gameExists')"
        />
        <UserError
          :message="'Title too short, it must have at least 2 characters.'"
          :error="'shortTitle'"
          v-if="errorsStore.isActiveError('user', 'shortTitle')"
        />
      </p>

      <label for="release-date" class="text-center sm:text-left">Release date</label>
      <input
        type="date"
        name="release-date"
        id="release-date"
        autocomplete="off"
        class="sm:col-span-2 h-8 px-4 rounded bg-slate-200"
        v-model="activeFormData.releaseDate"
      />

      <label for="genres" class="text-center sm:text-left">Genres</label>
      <input
        type="text"
        name="genres"
        id="genres"
        autocomplete="off"
        placeholder="Role-playing (RPG), Turn-based strategy (TBS), Simulator, Visual Novel"
        class="sm:col-span-2 h-8 px-4 rounded bg-slate-200"
        v-model="genresInput"
      />

      <label for="platforms" class="text-center sm:text-left">Platforms</label>
      <input
        type="text"
        name="platforms"
        id="platforms"
        autocomplete="off"
        placeholder="PC (Microsoft Windows), Mac, PlayStation 5, Xbox Series X|S, Google Stadia"
        class="sm:col-span-2 h-8 px-4 rounded bg-slate-200"
        v-model="platformsInput"
      />

      <label for="summary" class="text-center sm:text-left">Summary</label>
      <textarea
        name="summary"
        id="summary"
        cols="30"
        rows="6"
        autocomplete="off"
        placeholder="An ancient evil has returned to Baldur's Gate, intent on devouring it from the inside out. The fate of Faerun lies in your hands. Alone, you may resist. But together, you can overcome."
        class="sm:col-span-2 px-4 py-2 rounded bg-slate-200 resize-none"
        v-model="activeFormData.summary"
      ></textarea>

      <label for="userRating" class="text-center sm:text-left">User rating</label>
      <input
        type="number"
        name="userRating"
        id="userRating"
        min="0"
        max="100"
        autocomplete="off"
        placeholder="95"
        class="sm:col-span-2 h-8 px-4 rounded bg-slate-200"
        v-model="activeFormData.userRating"
      />
      <p class="col-span-full text-center">
        <UserError
          :message="'User rating value can\'t be negative.'"
          :error="'negativeUserRating'"
          v-if="errorsStore.isActiveError('user', 'negativeUserRating')"
        />
        <UserError
          :message="'User rating value can\'t exceed 100.'"
          :error="'highUserRating'"
          v-if="errorsStore.isActiveError('user', 'highUserRating')"
        />
      </p>

      <label for="criticRating" class="text-center sm:text-left">Critic rating</label>
      <input
        type="number"
        name="criticRating"
        id="criticRating"
        min="0"
        max="100"
        autocomplete="off"
        placeholder="95"
        class="sm:col-span-2 h-8 px-4 rounded bg-slate-200"
        v-model="activeFormData.criticRating"
      />
      <p class="col-span-full text-center">
        <UserError
          :message="'Critic rating value can\'t be negative.'"
          :error="'negativeCriticRating'"
          v-if="errorsStore.isActiveError('user', 'negativeCriticRating')"
        />
        <UserError
          :message="'Critic rating value can\'t exceed 100.'"
          :error="'highCriticRating'"
          v-if="errorsStore.isActiveError('user', 'highCriticRating')"
        />
      </p>

      <label for="category" class="text-center sm:text-left">Category</label>
      <select
        name="category"
        id="category"
        class="sm:col-span-2 h-8 px-4 rounded bg-slate-200"
        v-model="activeFormData.category"
      >
        <option value="backlog">Backlog</option>
        <option value="completed">Completed</option>
        <option value="wishlist">Wishlist</option>
      </select>
      <p class="col-span-full text-center">
        <UserError
          :message="'Selecting completed category for not yet released games is not allowed.'"
          :error="'futureReleaseCompleted'"
          v-if="errorsStore.isActiveError('user', 'futureReleaseCompleted')"
        />
      </p>

      <DynamicButton
        :type="'submit'"
        :class="'sm:col-start-2 sm:col-end-3 bg-sky-500 text-slate-900'"
        >Add</DynamicButton
      >
    </form>
    <InternalError
      :message="'Internal error has occured when updating local storage data.'"
      :error="'updatingStorage'"
      v-if="
        errorsStore.isActiveError('internal', 'updatingStorage') &&
        errorsStore.currentSource === 'manualAddition'
      "
    />
  </div>
</template>
