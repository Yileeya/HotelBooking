<template>
  <div class="banner">
    <div class="img-container">
      <img src="@/assets/img/title.svg" alt="banner title" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  height: 100vh;
  background-image: url('@/assets/img/banner.svg');
  background-position: center;
  background-size: cover;

  .img-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 45%;
    img {
      width: 30%;
    }
  }
  @media (max-width: 768px) {
    height: 30vh;
    min-height: 250px;
    .img-container img {
      width: 60vw;
    }
  }
}
</style>
