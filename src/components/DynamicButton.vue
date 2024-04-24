<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  }
});

const defaultClasses = 'px-2 py-1 rounded shadow hover:opacity-90 active:scale-95';
</script>

<template>
  <button :type="type" :class="[defaultClasses, props.class]" :aria-label="ariaLabel || undefined">
    <slot></slot>
  </button>
</template>
