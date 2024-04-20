<script setup lang="ts">
import { ref } from 'vue';
import type { Game } from '../types/index';
import useGamesStore from '../stores/games';
import useOptionsStore from '../stores/options';

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
  <form @submit.prevent="handleAddGame" novalidate>
    <label for="title">Title</label>
    <input
      type="text"
      name="title"
      id="title"
      autocomplete="off"
      required
      placeholder="Persona 3"
      v-model="activeFormData.title"
    />
    <label for="release-date">Release date</label>
    <input
      type="date"
      name="release-date"
      id="release-date"
      autocomplete="off"
      v-model="activeFormData.releaseDate"
    />
    <label for="genres">Genres</label>
    <input
      type="text"
      name="genres"
      id="genres"
      autocomplete="off"
      placeholder="Role-playing (RPG), Turn-based strategy (TBS), Simulator, Visual Novel"
      v-model="genresInput"
    />
    <label for="platforms">Platforms</label>
    <input
      type="text"
      name="platforms"
      id="platforms"
      autocomplete="off"
      placeholder="PlayStation 2"
      v-model="platformsInput"
    />
    <label for="summary">Summary</label>
    <textarea
      name="summary"
      id="summary"
      cols="30"
      rows="10"
      autocomplete="off"
      placeholder="Shin Megami Tensei: Persona 3 is a role-playing video game developed by Atlus. In the game, the player takes the role of a male high-school student who joins the Specialized Extracurricular Execution Squad (SEES), a group of students investigating the Dark Hour, a time period between one day and the next that few people are aware of. During the Dark Hour, the player enters Tartarus, a large tower containing Shadows, creatures that feed on the minds of humans. To fight the Shadows, each member of SEES is able to summon a Persona, a manifestation of a person's inner self. In addition to the standard elements of role-playing games, Persona 3 includes elements of simulation games, as the game's protagonist progresses day by day through a school year, making friends and forming relationships that improve the strength of his Personas in battle."
      v-model="activeFormData.summary"
    ></textarea>
    <label for="userRating">User rating</label>
    <input
      type="number"
      name="userRating"
      id="userRating"
      min="0"
      max="100"
      autocomplete="off"
      placeholder="92"
      v-model="activeFormData.userRating"
    />
    <label for="criticRating">Critic rating</label>
    <input
      type="number"
      name="criticRating"
      id="criticRating"
      min="0"
      max="100"
      autocomplete="off"
      placeholder="90"
      v-model="activeFormData.criticRating"
    />
    <label for="category">Category</label>
    <select name="category" id="category" v-model="optionsStore.selectedCategory">
      <option value="backlog">Backlog</option>
      <option value="completed">Completed</option>
      <option value="wishlist">Wishlist</option>
    </select>

    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
