<script setup lang="ts">
import useGamesStore from '../stores/games';

const gamesStore = useGamesStore();
</script>

<template>
  <div class="container mx-auto flex-1 flex flex-col justify-center items-center bg-slate-300">
    <div
      class="flex flex-col justify-center items-center gap-8 w-full h-full md:w-3/4 md:h-3/4 lg:w-2/3 lg:h-2/3 px-8 py-12"
    >
      <h1 class="text-3xl font-bold text-center">Video Game Tracker</h1>
      <p class="text-lg">Total games added: {{ gamesStore.storedGames?.length }}</p>
      <div class="flex flex-col sm:flex-row gap-8 text-lg">
        <p>Backlog: {{ gamesStore.backlogGames?.length }}</p>
        <p>Completed: {{ gamesStore.completedGames?.length }}</p>
        <p>Wishlist: {{ gamesStore.wishlistGames?.length }}</p>
      </div>
      <p>
        Welcome! This website features three different categories for video game tracking: backlog,
        completed and wishlist. There are some minor limitations, but generally you can switch
        category of your added game at any time.
      </p>
      <ul>
        <li>
          <strong>Backlog</strong>
          <br />
          Games that you own and plan to play one day, but maybe just can't find the right time for
          it.
        </li>
        <li>
          <strong>Completed</strong>
          <br />
          Games that you've already finished.
        </li>
        <li>
          <strong>Wishlist</strong>
          <br />
          Games that you don't currently own but want to get in the future.
        </li>
      </ul>
      <p>
        When adding game you're allowed to choose between auto and manual mode.
        <strong>Auto mode</strong> lets you search for games by simply entering title. If any
        results matches your search you'll be provided with a list of games to select from. Then you
        can simply click on game, view it's details, choose category and add it.
        <strong>Manual mode</strong> gives you a form and lets to fill out all the details yourself.
      </p>
      <p>Happy gaming!</p>
    </div>
  </div>
</template>
