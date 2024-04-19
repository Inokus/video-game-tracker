import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Game } from '../types/index';

const useGamesStore = defineStore('games', () => {
  const storedGames = ref<Game[] | null>(null);
  const searchResults = ref<Game[] | null>(null);
  const selectedGame = ref<Game | null>(null);

  const getStorage = () => {
    try {
      const gamesData = localStorage.getItem('games');
      storedGames.value = gamesData ? JSON.parse(gamesData) : [];
    } catch {
      storedGames.value = [];
      console.error(`Something went wrong when getting games data from local storage.`);
    }
  };

  const updateStorage = () => {
    try {
      const gamesData = JSON.stringify(storedGames.value);
      localStorage.setItem('games', gamesData);
    } catch {
      console.error(`Something went wrong when storing games data to local storage.`);
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
      // Inform user why game was not added
      console.error('Game already exists');
      return false;
    }
    return true;
  };

  const addGame = (game: Game) => {
    storedGames.value?.push(game);
  };

  watch(storedGames, () => updateStorage(), { deep: true });
  getStorage();

  return { storedGames, searchResults, selectedGame, selectGame, deselectGame, isNewGame, addGame };
});

export default useGamesStore;
