<script setup lang="ts">
import { ref, computed } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import type { Game, ResponseGame, ResponseGenreOrPlatform } from '../types/index';
import useGamesStore from '../stores/games';
import useErrorsStore from '../stores/errors';
import GameCard from './GameCard.vue';
import DynamicButton from './DynamicButton.vue';
import UserError from './UserError.vue';
import InternalError from './InternalError.vue';

const gamesStore = useGamesStore();
const errorsStore = useErrorsStore();

const sanitizedInput = ref('');

const igdbUrl = 'https://api.tevas.xyz/igdb/v4/games';

const sanitizeInput = (input: string): string => {
  let sanitized = input.trim();
  // Remove backslashes and double quotes
  sanitized = sanitized.replace(/[\\"]/g, '');
  // Remove additional whitespace between words
  return sanitized.replace(/\s+/g, ' ');
};

const requestData = computed(() => {
  return {
    method: 'POST',
    body: `fields aggregated_rating, category, cover.url, first_release_date, genres.name, name, platforms.name, rating, summary; search "${sanitizedInput.value}"; where (category = (0, 2, 4, 8, 9, 10) & version_parent = null); limit 10;`
  };
});

const formatDate = (timestamp?: number): string => {
  if (timestamp) {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  return '';
};

const formatUrl = (url?: string): string => {
  if (url) {
    return `https:${url.replace('thumb', 'cover_big')}`;
  }
  return '';
};

const formatResults = (results: ResponseGame[]) => {
  const formattedResults: Game[] = [];
  results.forEach(result => {
    if (result.name) {
      formattedResults.push({
        title: result.name,
        releaseDate: formatDate(result.first_release_date),
        genres: result.genres
          ? result.genres.map((genre: ResponseGenreOrPlatform) => genre.name)
          : [],
        platforms: result.platforms
          ? result.platforms.map((platform: ResponseGenreOrPlatform) => platform.name)
          : [],
        summary: result.summary ?? '',
        userRating: Math.round(result.rating ?? 0),
        criticRating: Math.round(result.aggregated_rating ?? 0),
        coverUrl: formatUrl(result.cover?.url),
        category: 'backlog',
        manualEntry: false
      });
    }
  });
  return formattedResults;
};

const hasActiveErrors = (): boolean => {
  errorsStore.removeAllErrors('user');

  sanitizedInput.value = sanitizeInput(gamesStore.searchInput);

  if (sanitizedInput.value.length < 2) {
    errorsStore.addError('user', 'shortSearch');
    return true;
  }

  if (sanitizedInput.value === gamesStore.lastSearchInput) {
    errorsStore.addError('user', 'sameSearch');
    return true;
  }

  gamesStore.lastSearchInput = sanitizedInput.value;
  return false;
};

async function getResults() {
  if (hasActiveErrors()) return;
  try {
    const response = await fetch(igdbUrl, requestData.value);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 1 && data[0].status) throw new Error(`${data[0].title}`);

    gamesStore.searchResults = formatResults(data);
  } catch (error) {
    errorsStore.addError('internal', 'fetchingData');
  }
}
</script>

<template>
  <form class="flex" @submit.prevent="getResults" novalidate>
    <input
      type="text"
      name="search"
      id="search"
      autocomplete="off"
      placeholder="Enter a game title"
      aria-label="games search"
      required
      class="h-8 px-4 py-2 rounded-l bg-slate-200"
      v-model="gamesStore.searchInput"
    />
    <DynamicButton
      :type="'submit'"
      :aria-label="'search'"
      :class="'rounded-none rounded-r bg-sky-500'"
    >
      <MagnifyingGlassIcon class="w-6 h-6 text-slate-900" />
    </DynamicButton>
  </form>
  <UserError
    :message="'Search query too short. Please make sure to enter at least 2 valid characters.'"
    :error="'shortSearch'"
    v-if="errorsStore.isActiveError('user', 'shortSearch')"
  />
  <UserError
    :message="'Please enter different search query.'"
    v-if="errorsStore.isActiveError('user', 'sameSearch')"
  />
  <InternalError
    :message="'Internal error has occured when fetching data.'"
    :error="'fetchingData'"
    v-if="errorsStore.isActiveError('internal', 'fetchingData')"
  />
  <div
    class="flex-1 flex flex-wrap justify-center items-center gap-4 mt-8 mb-12"
    v-if="gamesStore.searchResults && gamesStore.searchResults.length > 0"
  >
    <div v-for="(result, index) in gamesStore.searchResults" :key="index">
      <GameCard
        :game="result"
        tabindex="0"
        @click="gamesStore.selectGame(result)"
        @keyup.enter="gamesStore.selectGame(result)"
      />
    </div>
  </div>
  <div
    class="flex-1 flex justify-center items-center mt-8 mb-12"
    v-else-if="gamesStore.searchResults && gamesStore.searchResults.length === 0"
  >
    Couldn't find any games matching your search.
  </div>
</template>
