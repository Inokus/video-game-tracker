<script setup lang="ts">
import { computed } from 'vue';
import useGamesStore from '../stores/games';
import GameCard from '../components/GameCard.vue';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const gamesStore = useGamesStore();

const selectedGames = computed(() => {
  switch (props.category) {
    case 'backlog':
      return gamesStore.backlogGames;
    case 'completed':
      return gamesStore.completedGames;
    case 'wishlist':
      return gamesStore.wishlistGames;
    default:
      return [];
  }
});
</script>

<template>
  <div class="games" v-if="selectedGames && selectedGames.length > 0">
    <div v-for="(game, index) in selectedGames" :key="index">
      <GameCard :game="game" />
    </div>
  </div>
  <div v-else>There are no games currently added in {{ props.category }} category.</div>
</template>

// Same as in GameSearch
<style scoped>
.games {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  line-height: 0;
}
</style>
