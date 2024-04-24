<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import useGamesStore from '../stores/games';
import useOptionsStore from '../stores/options';
import GameSearch from './GameSearch.vue';
import AutoAdditionForm from './AutoAdditionForm.vue';
import ManualAdditionForm from './ManualAdditionForm.vue';
import ModalDialog from './ModalDialog.vue';
import DynamicButton from './DynamicButton.vue';

const gamesStore = useGamesStore();
const optionsStore = useOptionsStore();

const gameAdditionModal = ref<InstanceType<typeof ModalDialog> | null>(null);
const gameAdditionModalVisible = ref(false);

const showGameAdditionModal = () => {
  gameAdditionModalVisible.value = true;
  setTimeout(() => {
    gameAdditionModal.value?.showModal();
  }, 0);
};

const hideGameAdditionModal = () => {
  gamesStore.deselectGame();
  gameAdditionModalVisible.value = false;
};
</script>

<template>
  <DynamicButton
    :class="'bg-transparent sm:bg-sky-500 sm:text-slate-900 shadow-none sm:shadow text-slate-50'"
    :aria-label="'add game'"
    @click="showGameAdditionModal"
  >
    <span class="hidden sm:inline">Add game</span>
    <PlusIcon class="sm:hidden w-6 h-6" />
  </DynamicButton>
  <ModalDialog
    :class="'w-full h-full md:w-3/4 md:h-3/4 lg:w-2/3 lg:h-2/3'"
    ref="gameAdditionModal"
    v-if="gameAdditionModalVisible"
    @close="hideGameAdditionModal"
  >
    <div class="flex flex-col items-center gap-8 h-full" v-if="!gamesStore.selectedGame">
      <div class="flex gap-8">
        <div>
          <input
            type="radio"
            name="mode"
            value="auto"
            id="auto"
            class="mr-2 accent-sky-500"
            v-model="optionsStore.selectedMode"
          />
          <label for="auto">Auto</label>
        </div>
        <div>
          <input
            type="radio"
            name="mode"
            value="manual"
            id="manual"
            class="mr-2 accent-sky-500"
            v-model="optionsStore.selectedMode"
          />
          <label for="manual">Manual</label>
        </div>
      </div>
      <div class="flex-1 flex flex-col items-center" v-if="optionsStore.selectedMode === 'auto'">
        <GameSearch />
      </div>
      <div class="flex-1 flex flex-col items-center w-full" v-else>
        <ManualAdditionForm />
      </div>
    </div>
    <div class="h-full" v-else>
      <AutoAdditionForm />
    </div>
  </ModalDialog>
</template>
