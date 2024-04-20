<script setup lang="ts">
import { ref, computed } from 'vue';
import useGamesStore from '../stores/games';
import GameCard from '../components/GameCard.vue';
import ModalDialog from '../components/ModalDialog.vue';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const gamesStore = useGamesStore();

const searchInput = ref('');
const removalEnabled = ref(false);
const modal = ref<InstanceType<typeof ModalDialog> | null>(null);

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

const filteredBySearchGames = computed(() => {
  const seachTerm = searchInput.value.toLowerCase();
  return selectedGames.value?.filter(game => game.title.toLowerCase().includes(seachTerm));
});

const handleAllRemoval = () => {
  gamesStore.removeAllGames();
  modal.value?.closeModal();
};
</script>

<template>
  <input type="text" aria-label="search" v-model="searchInput" />
  <button type="button" @click="removalEnabled = !removalEnabled">
    <span v-if="!removalEnabled">Enable removal</span>
    <span v-else>Disable removal</span>
  </button>
  <button type="button" @click="modal?.showModal">Remove all</button>
  <ModalDialog ref="modal">
    This will remove all games from all categories. Are you sure?
    <button type="button" @click="handleAllRemoval">Yes</button>
    <button type="button" @click="modal?.closeModal">No</button>
  </ModalDialog>
  <div class="games" v-if="selectedGames && selectedGames.length > 0">
    <div v-for="(game, index) in filteredBySearchGames" :key="index">
      <button type="button" @click="gamesStore.removeGame(game.title)" v-if="removalEnabled">
        Remove
      </button>
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
}
</style>
