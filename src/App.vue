<template>
  <div class="app-layout" :class="[{ 'is-loading': uiuxStore.loading }]">
    <Transition name="fade">
      <Loading v-show="uiuxStore.loading" />
    </Transition>
    <RouterView />
    <FooterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import FooterView from '@/components/FooterView.vue';
import Loading from '@/components/Loading.vue';
import { useUIUXStore } from '@/stores/uiux';
const uiuxStore = useUIUXStore();
</script>

<style scoped lang="scss">
.app-layout {
  position: relative;
  &.is-loading {
    max-height: 100vh;
    overflow: hidden;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
