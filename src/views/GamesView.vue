<script setup lang="ts">
import { ref, computed } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';
import useGamesStore from '../stores/games';
import useErrorsStore from '../stores/errors';
import GameCard from '../components/GameCard.vue';
import GameDetails from '../components/GameDetails.vue';
import ModalDialog from '../components/ModalDialog.vue';
import DynamicButton from '../components/DynamicButton.vue';
import InternalError from '../components/InternalError.vue';
import type { Game } from '../types/index';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const gamesStore = useGamesStore();
const errorsStore = useErrorsStore();

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

const handleRemoval = (title: string) => {
  errorsStore.currentSource = 'gamesRemove';
  gamesStore.removeGame(title);
};

const handleAllRemoval = () => {
  errorsStore.currentSource = 'gamesRemoveModal';
  gamesStore.removeAllGames();
  if (!errorsStore.isActiveError('internal', 'updatingStorage')) {
    removalModal.value?.closeModal();
  }
};
</script>

<template>
  <div class="container mx-auto flex-1 flex flex-col bg-slate-300">
    <div class="flex-1 flex flex-col" v-if="selectedGames && selectedGames.length > 0">
      <div class="flex flex-col items-center gap-4 px-4 py-8 sm:flex-row">
        <input
          type="text"
          name="search"
          placeholder="Search"
          aria-label="games search"
          autocomplete="off"
          class="w-full sm:flex-1 h-8 px-4 py-2 rounded"
          v-model="searchInput"
        />

        <div class="flex gap-2 text-slate-50">
          <DynamicButton
            :class="removalEnabled ? 'bg-red-600 shadow-inner shadow-red-900' : 'bg-red-500'"
            @click="removalEnabled = !removalEnabled"
          >
            <span v-if="!removalEnabled">Enable removal</span>
            <span v-else>Disable removal</span>
          </DynamicButton>
          <DynamicButton :class="'bg-red-600'" @click="showRemovalModal">Remove all</DynamicButton>
        </div>
      </div>

      <ModalDialog
        :class="'w-max h-max'"
        ref="removalModal"
        v-if="removalModalVisible"
        @close="removalModalVisible = false"
      >
        <div class="flex flex-col items-center gap-4 text-center">
          This will remove all games from all categories. Are you sure?
          <div>
            <DynamicButton :class="'mr-4 bg-red-600 text-slate-50'" @click="handleAllRemoval"
              >Confirm</DynamicButton
            >
            <DynamicButton :class="'bg-sky-500'" @click="removalModal?.closeModal"
              >Back</DynamicButton
            >
          </div>
        </div>
        <InternalError
          :message="'Internal error has occured when updating local storage data.'"
          :error="'updatingStorage'"
          v-if="
            errorsStore.isActiveError('internal', 'updatingStorage') &&
            errorsStore.currentSource === 'gamesRemoveModal'
          "
        />
      </ModalDialog>

      <div class="flex-1 flex flex-row flex-wrap justify-center items-center gap-4 px-4 py-8">
        <div class="relative" v-for="(game, index) in filteredBySearchGames" :key="index">
          <DynamicButton
            :class="'absolute top-2 right-2 z-10 bg-red-600 text-slate-50 hover:scale-95'"
            :aria-label="'remove'"
            @click="handleRemoval(game.title)"
            v-if="removalEnabled"
          >
            <TrashIcon class="w-8 h-8" />
          </DynamicButton>
          <GameCard
            :game="game"
            tabindex="0"
            :class="{ 'hover:scale-95': !removalEnabled }"
            @click="showDetailsModal(game)"
            @keyup.enter="showDetailsModal(game)"
          />
        </div>

        <ModalDialog
          ref="detailsModal"
          :class="'w-full h-full md:w-3/4 md:h-3/4 lg:w-2/3 lg:h-2/3'"
          v-if="detailsModalVisible && gamesStore.selectedGame"
          @close="hideDetailsModal"
        >
          <div class="flex flex-col justify-center items-center h-full">
            <div class="overflow-auto">
              <GameDetails />
              <div class="grid grid-cols-3 gap-4 mt-4">
                <label for="category" class="font-bold">Category:</label>
                <select
                  name="category"
                  id="category"
                  class="col-span-2 rounded"
                  @change="errorsStore.currentSource = 'gamesCategoryUpdate'"
                  v-model="gamesStore.selectedGame.category"
                >
                  <option value="backlog">Backlog</option>
                  <option
                    value="completed"
                    v-if="
                      gamesStore.selectedGame.releaseDate &&
                      new Date(gamesStore.selectedGame.releaseDate) <= gamesStore.currentDate
                    "
                  >
                    Completed
                  </option>
                  <option value="wishlist">Wishlist</option>
                </select>
              </div>
              <InternalError
                :message="'Internal error has occured when updating local storage data.'"
                :error="'updatingStorage'"
                v-if="
                  errorsStore.isActiveError('internal', 'updatingStorage') &&
                  errorsStore.currentSource === 'gamesCategoryUpdate'
                "
              />
            </div>
          </div>
        </ModalDialog>
      </div>
      <InternalError
        :message="'Internal error has occured when updating local storage data.'"
        :error="'updatingStorage'"
        v-if="
          errorsStore.isActiveError('internal', 'updatingStorage') &&
          errorsStore.currentSource === 'gamesRemove'
        "
      />
    </div>
    <div class="flex-1 flex justify-center items-center" v-else>
      There are no games currently added in {{ props.category }} category.
    </div>
  </div>
</template>
