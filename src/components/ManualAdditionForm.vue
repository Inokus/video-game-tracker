<script setup lang="ts">
import { ref } from 'vue';
import type { Game } from '../types/index';
import useGamesStore from '../stores/games';
import useOptionsStore from '../stores/options';
import DynamicButton from './DynamicButton.vue';

const gamesStore = useGamesStore();
const optionsStore = useOptionsStore();

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
  newData.category = optionsStore.selectedCategory;
  activeFormData.value = newData;
};

const resetForm = () => {
  activeFormData.value = { ...initialFormData };
  genresInput.value = '';
  platformsInput.value = '';
};

const handleAddGame = () => {
  formatData();
  if (gamesStore.isNewGame(activeFormData.value)) {
    gamesStore.addGame(activeFormData.value);
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

      <label for="category" class="text-center sm:text-left">Category</label>
      <select
        name="category"
        id="category"
        class="sm:col-span-2 h-8 px-4 rounded bg-slate-200"
        v-model="optionsStore.selectedCategory"
      >
        <option value="backlog">Backlog</option>
        <option value="completed">Completed</option>
        <option value="wishlist">Wishlist</option>
      </select>

      <DynamicButton
        :type="'submit'"
        :class="'sm:col-start-2 sm:col-end-3 bg-sky-500 text-slate-900'"
        >Add</DynamicButton
      >
    </form>
  </div>
</template>
