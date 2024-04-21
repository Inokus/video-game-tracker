<script setup lang="ts">
import { ref, computed } from 'vue';
import useGamesStore from '../stores/games';
import GameCard from '../components/GameCard.vue';
import GameDetails from '../components/GameDetails.vue';
import ModalDialog from '../components/ModalDialog.vue';
import type { Game } from '../types/index';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const gamesStore = useGamesStore();

const searchInput = ref('');
const removalEnabled = ref(false);
const removalModal = ref<InstanceType<typeof ModalDialog> | null>(null);
const removalModalVisible = ref(false);
const detailsModal = ref<InstanceType<typeof ModalDialog> | null>(null);
const detailsModalVisible = ref(false);

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

const showRemovalModal = () => {
  removalModalVisible.value = true;
  setTimeout(() => {
    removalModal.value?.showModal();
  }, 0);
};

const showDetailsModal = (game: Game) => {
  gamesStore.selectGame(game);
  detailsModalVisible.value = true;
  setTimeout(() => {
    detailsModal.value?.showModal();
  }, 0);
};

const hideDetailsModal = () => {
  gamesStore.deselectGame();
  detailsModalVisible.value = false;
};

const handleAllRemoval = () => {
  gamesStore.removeAllGames();
  removalModal.value?.closeModal();
};
</script>

<template>
  <input type="text" aria-label="search" v-model="searchInput" />
  <button type="button" @click="removalEnabled = !removalEnabled">
    <span v-if="!removalEnabled">Enable removal</span>
    <span v-else>Disable removal</span>
  </button>
  <button type="button" @click="showRemovalModal">Remove all</button>
  <ModalDialog ref="removalModal" v-if="removalModalVisible" @close="removalModalVisible = false">
    This will remove all games from all categories. Are you sure?
    <button type="button" @click="handleAllRemoval">Yes</button>
    <button type="button" @click="removalModal?.closeModal">No</button>
  </ModalDialog>
  <div class="games" v-if="selectedGames && selectedGames.length > 0">
    <div v-for="(game, index) in filteredBySearchGames" :key="index">
      <button type="button" @click="gamesStore.removeGame(game.title)" v-if="removalEnabled">
        Remove
      </button>
      <GameCard :game="game" @click="showDetailsModal(game)" />
    </div>
    <ModalDialog ref="detailsModal" v-if="detailsModalVisible" @close="hideDetailsModal">
      <GameDetails />
    </ModalDialog>
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
