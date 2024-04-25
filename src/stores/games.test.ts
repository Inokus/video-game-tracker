import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import type { Category } from '../types/index';
import useGamesStore from './games';

describe('Games Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes starting values', () => {
    const gamesStore = useGamesStore();

    expect(gamesStore.storedGames).toEqual([]);
    expect(gamesStore.lastSearchInput).toEqual('');
    expect(gamesStore.searchResults).toEqual(null);
    expect(gamesStore.selectedGame).toEqual(null);
  });

  it('selects game', () => {
    const gamesStore = useGamesStore();

    gamesStore.selectGame({
      title: 'Game 1',
      releaseDate: '',
      genres: [''],
      platforms: [''],
      summary: '',
      userRating: 0,
      criticRating: 0,
      coverUrl: '',
      category: 'backlog',
      manualEntry: true
    });

    expect(gamesStore.selectedGame).toEqual({
      title: 'Game 1',
      releaseDate: '',
      genres: [''],
      platforms: [''],
      summary: '',
      userRating: 0,
      criticRating: 0,
      coverUrl: '',
      category: 'backlog',
      manualEntry: true
    });
  });

  it('deselects game', () => {
    const gamesStore = useGamesStore();

    gamesStore.selectedGame = {
      title: 'Game 1',
      releaseDate: '',
      genres: [''],
      platforms: [''],
      summary: '',
      userRating: 0,
      criticRating: 0,
      coverUrl: '',
      category: 'backlog',
      manualEntry: true
    };

    gamesStore.deselectGame();

    expect(gamesStore.selectedGame).toEqual(null);
  });

  it('checks if game title exists in stored games array', () => {
    const gamesStore = useGamesStore();

    gamesStore.storedGames = [
      {
        title: 'Game 1',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      }
    ];

    const newGame = {
      title: 'Game 2',
      releaseDate: '',
      genres: [''],
      platforms: [''],
      summary: '',
      userRating: 0,
      criticRating: 0,
      coverUrl: '',
      category: 'backlog' as Category,
      manualEntry: true
    };

    expect(gamesStore.isNewGame(gamesStore.storedGames[0])).toEqual(false);
    expect(gamesStore.isNewGame(newGame)).toEqual(true);
  });

  it('adds game to stored games array', () => {
    const gamesStore = useGamesStore();

    gamesStore.storedGames = [];

    const newGame = {
      title: 'Game 1',
      releaseDate: '',
      genres: [''],
      platforms: [''],
      summary: '',
      userRating: 0,
      criticRating: 0,
      coverUrl: '',
      category: 'backlog' as Category,
      manualEntry: true
    };

    gamesStore.addGame(newGame);

    expect(gamesStore.storedGames).toEqual([
      {
        title: 'Game 1',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      }
    ]);
  });

  it('removes game from stored games array', () => {
    const gamesStore = useGamesStore();

    gamesStore.storedGames = [
      {
        title: 'Game 1',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      },
      {
        title: 'Game 2',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      }
    ];

    gamesStore.removeGame('Game 1');

    expect(gamesStore.storedGames).toEqual([
      {
        title: 'Game 2',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      }
    ]);
  });

  it('removes all games from stored games array', () => {
    const gamesStore = useGamesStore();

    gamesStore.storedGames = [
      {
        title: 'Game 1',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      },
      {
        title: 'Game 2',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      }
    ];

    gamesStore.removeAllGames();

    expect(gamesStore.storedGames).toEqual([]);
  });

  it('returns games filtered by category', () => {
    const gamesStore = useGamesStore();

    gamesStore.storedGames = [
      {
        title: 'Game 1',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      },
      {
        title: 'Game 2',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'completed',
        manualEntry: true
      },
      {
        title: 'Game 3',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      },
      {
        title: 'Game 4',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'wishlist',
        manualEntry: true
      }
    ];

    expect(gamesStore.completedGames).toEqual([
      {
        title: 'Game 2',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'completed',
        manualEntry: true
      }
    ]);

    expect(gamesStore.backlogGames).toEqual([
      {
        title: 'Game 1',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      },
      {
        title: 'Game 3',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'backlog',
        manualEntry: true
      }
    ]);

    expect(gamesStore.wishlistGames).toEqual([
      {
        title: 'Game 4',
        releaseDate: '',
        genres: [''],
        platforms: [''],
        summary: '',
        userRating: 0,
        criticRating: 0,
        coverUrl: '',
        category: 'wishlist',
        manualEntry: true
      }
    ]);
  });
});
