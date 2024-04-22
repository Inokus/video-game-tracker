<script setup lang="ts">
import { ref } from 'vue';
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
  <DynamicButton :class="''" :aria-label="'label'" @click="showGameAdditionModal">
    Add game
  </DynamicButton>
  <ModalDialog
    :class="'w-11/12 h-5/6'"
    ref="gameAdditionModal"
    v-if="gameAdditionModalVisible"
    @close="hideGameAdditionModal"
  >
    <div class="flex flex-col justify-center items-center gap-8" v-if="!gamesStore.selectedGame">
      <div class="flex gap-8">
        <div>
          <input
            type="radio"
            name="mode"
            value="auto"
            id="auto"
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
            v-model="optionsStore.selectedMode"
          />
          <label for="manual">Manual</label>
        </div>
      </div>
      <div v-if="optionsStore.selectedMode === 'auto'">
        <GameSearch />
      </div>
      <div class="h-full" v-else>
        <ManualAdditionForm />
      </div>
    </div>
    <div class="h-full" v-else>
      <AutoAdditionForm />
    </div>
  </ModalDialog>
</template>
