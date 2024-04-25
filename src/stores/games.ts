import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Game, Category } from '../types/index';
import useErrorsStore from './errors';

const useGamesStore = defineStore('games', () => {
  const errorsStore = useErrorsStore();

  const storedGames = ref<Game[] | null>(null);
  const lastSearchInput = ref<string>('');
  const searchResults = ref<Game[] | null>(null);
  const selectedGame = ref<Game | null>(null);
  const currentDate = new Date();

  const getStorage = () => {
    try {
      const gamesData = localStorage.getItem('games');
      storedGames.value = gamesData ? JSON.parse(gamesData) : [];
    } catch {
      storedGames.value = [];
      errorsStore.addError('internal', 'gettingStorage');
    }
  };

  const updateStorage = () => {
    try {
      const gamesData = JSON.stringify(storedGames.value);
      localStorage.setItem('games', gamesData);
    } catch {
      errorsStore.addError('internal', 'updatingStorage');
    }
  };

  const selectGame = (game: Game) => {
    selectedGame.value = game;
  };

  const deselectGame = () => {
    selectedGame.value = null;
  };

  const isNewGame = (game: Game): boolean => {
    if (storedGames.value?.some(storedGame => game.title === storedGame.title)) {
      return false;
    }
    return true;
  };

  const addGame = (game: Game) => {
    storedGames.value?.push(game);
  };

  const removeGame = (title: string) => {
    const index = storedGames.value?.findIndex(game => game.title === title);
    if (index !== -1 && index !== undefined) {
      storedGames.value?.splice(index, 1);
    }
  };

  const removeAllGames = () => {
    storedGames.value = [];
  };

  const filterByCategory = (category: Category) => {
    return storedGames.value?.filter(game => game.category === category);
  };

  watch(storedGames, () => updateStorage(), { deep: true });

  getStorage();

  const backlogGames = computed(() => filterByCategory('backlog'));
  const completedGames = computed(() => filterByCategory('completed'));
  const wishlistGames = computed(() => filterByCategory('wishlist'));

  return {
    storedGames,
    lastSearchInput,
    searchResults,
    selectedGame,
    backlogGames,
    completedGames,
    wishlistGames,
    currentDate,
    selectGame,
    deselectGame,
    isNewGame,
    addGame,
    removeGame,
    removeAllGames
  };
});

export default useGamesStore;
