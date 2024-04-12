<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/backlog">Backlog</RouterLink>
      <RouterLink to="/completed">Completed</RouterLink>
      <RouterLink to="/wishlist">Wishlist</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
