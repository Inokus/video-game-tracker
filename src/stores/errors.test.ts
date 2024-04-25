import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useErrorsStore from './errors';

describe('Errors Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes empty arrays for errors', () => {
    const errorsStore = useErrorsStore();

    expect(errorsStore.userErrors).toEqual([]);
    expect(errorsStore.internalErrors).toEqual([]);
  });

  describe('Adding Errors', () => {
    it('adds errors to correct array', () => {
      const errorsStore = useErrorsStore();

      errorsStore.addError('user', 'error 1');
      errorsStore.addError('user', 'error 2');
      errorsStore.addError('internal', 'error 3');

      expect(errorsStore.userErrors).toEqual(['error 1', 'error 2']);
      expect(errorsStore.internalErrors).toEqual(['error 3']);
    });

    it("doesn't allow to add duplicate error values", () => {
      const errorsStore = useErrorsStore();

      errorsStore.addError('user', 'error 1');
      errorsStore.addError('user', 'error 2');
      errorsStore.addError('user', 'error 1');
      errorsStore.addError('user', 'error 2');

      expect(errorsStore.userErrors).toEqual(['error 1', 'error 2']);
    });

    it("doesn't allow to add duplicate error values", () => {
      const errorsStore = useErrorsStore();

      errorsStore.addError('user', 'error 1');
      errorsStore.addError('user', 'error 2');
      errorsStore.addError('user', 'error 1');
      errorsStore.addError('user', 'error 2');

      expect(errorsStore.userErrors).toEqual(['error 1', 'error 2']);
    });
  });

  describe('Removing Errors', () => {
    it('removes errors from correct array', () => {
      const errorsStore = useErrorsStore();
      errorsStore.userErrors = ['error 1', 'error 2', 'error 3'];
      errorsStore.internalErrors = ['error 4', 'error 5', 'error 6'];

      errorsStore.removeError('user', 'error 1');
      errorsStore.removeError('user', 'error 2');
      errorsStore.removeError('internal', 'error 4');
      errorsStore.removeError('internal', 'error 6');

      expect(errorsStore.userErrors).toEqual(['error 3']);
      expect(errorsStore.internalErrors).toEqual(['error 5']);
    });

    it("doesn't remove anything if error is not found", () => {
      const errorsStore = useErrorsStore();
      errorsStore.userErrors = ['error 1', 'error 2', 'error 3'];

      errorsStore.removeError('user', 'error 4');
      errorsStore.removeError('user', 'error 5');

      expect(errorsStore.userErrors).toEqual(['error 1', 'error 2', 'error 3']);
    });

    it('removes all errors from specified array', () => {
      const errorsStore = useErrorsStore();
      errorsStore.userErrors = ['error 1', 'error 2', 'error 3'];
      errorsStore.internalErrors = ['error 4', 'error 5', 'error 6'];

      errorsStore.removeAllErrors('user');

      expect(errorsStore.userErrors).toEqual([]);
      expect(errorsStore.internalErrors).toEqual(['error 4', 'error 5', 'error 6']);
    });
  });

  it('returns boolean specifying whether error is in chosen array or not', () => {
    const errorsStore = useErrorsStore();
    errorsStore.userErrors = ['error 1', 'error 2', 'error 3'];
    errorsStore.internalErrors = ['error 4', 'error 5', 'error 6'];

    expect(errorsStore.isActiveError('user', 'error 1')).toEqual(true);
    expect(errorsStore.isActiveError('user', 'error 4')).toEqual(false);
    expect(errorsStore.isActiveError('internal', 'error 5')).toEqual(true);
    expect(errorsStore.isActiveError('internal', 'error 2')).toEqual(false);
  });
});
