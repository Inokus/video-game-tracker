import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Mode, Category } from '../types/index';

const useOptionsStore = defineStore('options', () => {
  const selectedMode = ref<Mode>('auto');
  const selectedCategory = ref<Category>('backlog');

  return {
    selectedMode,
    selectedCategory
  };
});

export default useOptionsStore;
