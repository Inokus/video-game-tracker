import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ErrorType } from '../types/index';

const useErrorsStore = defineStore('errors', () => {
  const userErrors = ref<string[]>([]);
  const internalErrors = ref<string[]>([]);
  const currentSource = ref('');

  const addError = (type: ErrorType, error: string) => {
    if (type === 'user' && !userErrors.value.includes(error)) {
      userErrors.value.push(error);
    } else if (type === 'internal' && !internalErrors.value.includes(error)) {
      internalErrors.value.push(error);
    }
  };

  const removeError = (type: ErrorType, error: string) => {
    if (type === 'user') {
      const errorIndex = userErrors.value.indexOf(error);
      if (errorIndex !== -1) {
        userErrors.value.splice(errorIndex, 1);
      }
    } else if (type === 'internal') {
      const errorIndex = internalErrors.value.indexOf(error);
      if (errorIndex !== -1) {
        internalErrors.value.splice(errorIndex, 1);
      }
    }
  };

  const removeAllErrors = (type: ErrorType) => {
    if (type === 'user') {
      userErrors.value = [];
    }
    if (type === 'internal') {
      internalErrors.value = [];
    }
  };

  const isActiveError = (type: ErrorType, error: string) => {
    if (type === 'user') {
      return userErrors.value.includes(error);
    }
    if (type === 'internal') {
      return internalErrors.value.includes(error);
    }
    return false;
  };

  return {
    userErrors,
    internalErrors,
    currentSource,
    addError,
    removeError,
    removeAllErrors,
    isActiveError
  };
});

export default useErrorsStore;
