<script setup lang="ts">
import { ref, computed } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';
import useGamesStore from '../stores/games';
import GameCard from '../components/GameCard.vue';
import GameDetails from '../components/GameDetails.vue';
import ModalDialog from '../components/ModalDialog.vue';
import DynamicButton from '../components/DynamicButton.vue';
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
  <div class="container mx-auto flex-1 flex flex-col bg-slate-300">
    <div class="flex-1 flex flex-col" v-if="selectedGames && selectedGames.length > 0">
      <div class="flex flex-col items-center gap-4 px-4 py-8 sm:flex-row">
        <input
          type="text"
          aria-label="search"
          placeholder="Search"
          class="w-full h-8 px-4 py-2 rounded sm:flex-1"
          v-model="searchInput"
        />

        <div class="flex gap-2">
          <DynamicButton :class="''" @click="removalEnabled = !removalEnabled">
            <span v-if="!removalEnabled">Enable removal</span>
            <span v-else>Disable removal</span>
          </DynamicButton>
          <DynamicButton :class="''" @click="showRemovalModal">Remove all</DynamicButton>
        </div>
      </div>

      <ModalDialog
        :class="'w-max h-max'"
        ref="removalModal"
        v-if="removalModalVisible"
        @close="removalModalVisible = false"
      >
        <div class="flex flex-col items-center gap-4">
          This will remove all games from all categories. Are you sure?
          <div>
            <DynamicButton class="mr-4" @click="handleAllRemoval">Yes</DynamicButton>
            <DynamicButton @click="removalModal?.closeModal">No</DynamicButton>
          </div>
        </div>
      </ModalDialog>

      <div class="flex-1 flex flex-row flex-wrap justify-center items-center gap-4 px-4 py-8">
        <div class="max-w-min relative" v-for="(game, index) in filteredBySearchGames" :key="index">
          <DynamicButton
            :class="'absolute top-2 right-2 z-10 bg-red-700 text-black '"
            :ariaLabel="'remove'"
            @click="gamesStore.removeGame(game.title)"
            v-if="removalEnabled"
          >
            <TrashIcon class="w-8 h-8" />
          </DynamicButton>
          <GameCard :game="game" @click="showDetailsModal(game)" />
        </div>

        <ModalDialog
          ref="detailsModal"
          v-if="detailsModalVisible && gamesStore.selectedGame"
          @close="hideDetailsModal"
        >
          <GameDetails />
          <div class="flex">
            <label for="category">Category: </label>
            <select
              name="category"
              id="category"
              class="w-full"
              v-model="gamesStore.selectedGame.category"
            >
              <option value="backlog">Backlog</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
            </select>
          </div>
        </ModalDialog>
      </div>
    </div>
    <div class="flex-1 flex justify-center items-center" v-else>
      There are no games currently added in {{ props.category }} category.
    </div>
  </div>
</template>
