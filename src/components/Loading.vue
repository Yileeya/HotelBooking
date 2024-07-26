<template>
  <div class="loading-layout">
    <div class="loader"></div>
  </div>
</template>

<style scoped lang="scss">
.loading-layout {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(71, 71, 71, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    color: white;
    width: fit-content;
    font-weight: bold;
    font-size: 30px;
    clip-path: inset(0 100% 0 0);
    animation: loadingText 1.5s steps(11) infinite;
    &:before {
      content: 'Loading...';
    }
  }
  @keyframes loadingText {
    to {
      clip-path: inset(0 -1ch 0 0);
    }
  }
}
</style>
