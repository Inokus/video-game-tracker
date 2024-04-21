<script setup lang="ts">
import { ref } from 'vue';
import useGamesStore from '../stores/games';
import useOptionsStore from '../stores/options';
import GameSearch from './GameSearch.vue';
import AutoAdditionForm from './AutoAdditionForm.vue';
import ManualAdditionForm from './ManualAdditionForm.vue';
import ModalDialog from './ModalDialog.vue';

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
  <button type="button" @click="showGameAdditionModal">Add game</button>
  <ModalDialog
    ref="gameAdditionModal"
    v-if="gameAdditionModalVisible"
    @close="hideGameAdditionModal"
  >
    <div v-if="!gamesStore.selectedGame">
      <div>
        <input
          type="radio"
          name="mode"
          value="auto"
          id="auto"
          v-model="optionsStore.selectedMode"
        />
        <label for="auto">Auto</label>
        <input
          type="radio"
          name="mode"
          value="manual"
          id="manual"
          v-model="optionsStore.selectedMode"
        />
        <label for="manual">Manual</label>
      </div>
      <div v-if="optionsStore.selectedMode === 'auto'">
        <GameSearch />
      </div>
      <div v-else>
        <ManualAdditionForm />
      </div>
    </div>
    <div v-else>
      <AutoAdditionForm />
    </div>
  </ModalDialog>
</template>
