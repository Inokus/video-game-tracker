<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { HomeIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import useGamesStore from './stores/games';
import GameAddition from './components/GameAddition.vue';
import DynamicButton from './components/DynamicButton.vue';
import InternalError from './components/InternalError.vue';
import useErrorsStore from './stores/errors';

const errorsStore = useErrorsStore();
errorsStore.currentSource = 'app';

useGamesStore();

const isMenuOpen = ref(false);

const toggleMenu = (event: MouseEvent | KeyboardEvent) => {
  event.stopPropagation();
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  document.body.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    const navMenu = document.querySelector('nav') as HTMLElement;

    if (isMenuOpen.value && !navMenu.contains(target)) {
      closeMenu();
    }
  });
});
</script>

<template>
  <header class="fixed h-16 w-full z-20 bg-slate-800">
    <div class="container mx-auto flex justify-between items-center h-full px-4">
      <DynamicButton
        class="sm:hidden shadow-none text-slate-50"
        aria-label="menu"
        @click="toggleMenu"
      >
        <Bars3Icon class="w-6 h-6" />
      </DynamicButton>
      <nav
        class="gap-2 sm:gap-4 text-slate-50"
        :class="{
          'hidden sm:flex': !isMenuOpen,
          'flex flex-col sm:flex-row absolute sm:static top-16 left-0 px-4 sm:px-0 pt-1 pb-4 sm:py-0 rounded-br bg-slate-800 sm:bg-transparent':
            isMenuOpen
        }"
      >
        <RouterLink to="/backlog">Backlog</RouterLink>
        <RouterLink to="/completed">Completed</RouterLink>
        <RouterLink to="/wishlist">Wishlist</RouterLink>
      </nav>
      <div class="absolute left-0 right-0 mx-auto w-max">
        <RouterLink to="/" aria-label="home">
          <HomeIcon class="w-6 h-6 text-slate-50" />
        </RouterLink>
      </div>
      <GameAddition />
    </div>
  </header>
  <main class="relative top-16 flex-1 flex flex-col bg-slate-400">
    <RouterView />
    <InternalError
      :message="'Internal error has occured when getting local storage data.'"
      :error="'gettingStorage'"
      v-if="errorsStore.isActiveError('internal', 'gettingStorage')"
    />
    <InternalError
      :message="'Internal error has occured when updating local storage data.'"
      :error="'updatingStorage'"
      v-else-if="
        errorsStore.isActiveError('internal', 'updatingStorage') &&
        errorsStore.currentSource === 'app'
      "
    />
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - 4rem);
}

a {
  text-decoration: underline;
}

a:hover:not(.router-link-active) {
  opacity: 0.9;
  scale: 1.05;
}

.router-link-active {
  opacity: 0.8;
  text-decoration: none;
  cursor: default;
}
</style>
