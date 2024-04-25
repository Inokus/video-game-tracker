import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Mode } from '../types/index';

const useOptionsStore = defineStore('options', () => {
  const selectedMode = ref<Mode>('auto');

  return {
    selectedMode
  };
});

export default useOptionsStore;
