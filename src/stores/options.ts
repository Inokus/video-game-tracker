import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Mode } from '../types/index';

const useOptionsStore = defineStore('options', () => {
  const selectedMode = ref<Mode>('auto');
  const removalEnabled = ref(false);

  return {
    selectedMode,
    removalEnabled
  };
});

export default useOptionsStore;
