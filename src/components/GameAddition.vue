<script setup lang="ts">
import { ref } from 'vue';
import useGamesStore from '../stores/games';
import GameSearch from './GameSearch.vue';
import AutoAdditionForm from './AutoAdditionForm.vue';
import ManualAdditionForm from './ManualAdditionForm.vue';

const gamesStore = useGamesStore();

const modal = ref<HTMLDialogElement | null>(null);
const selectedMode = ref('auto');

const closeModal = () => {
  selectedMode.value = 'auto';
  modal.value?.close();
};
</script>

<template>
  <button type="button" @click="modal?.showModal">Add game</button>

  <dialog ref="modal">
    <button type="button" @click="closeModal">X</button>
    <div v-if="!gamesStore.selectedGame">
      <div>
        <input type="radio" name="mode" value="auto" id="auto" checked v-model="selectedMode" />
        <label for="auto">Auto</label>
        <input type="radio" name="mode" value="manual" id="manual" v-model="selectedMode" />
        <label for="manual">Manual</label>
      </div>
      <div v-if="selectedMode === 'auto'">
        <GameSearch />
      </div>
      <div v-else>
        <ManualAdditionForm />
      </div>
    </div>
    <div v-else>
      <AutoAdditionForm />
    </div>
  </dialog>
</template>
