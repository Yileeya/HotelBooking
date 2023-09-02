<template>
  <div class="arrow" @click.prevent="scrollDown">
    <i class="fa fa-angle-double-down fa-3x" />
  </div>
</template>

<script setup>
const scrollDown = function () {
  const roomIntro = document.querySelector('.rooms-intro-area')
  if (roomIntro) {
    const offset = -60
    const targetScrollPosition = roomIntro.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped lang="scss">
.arrow {
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: -4em;
  .fa {
    animation: animate 2s infinite;
    color: white;
  }
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotate(0deg) translate(20px, -20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(0deg) translate(20px, 20px);
  }
}
</style>
