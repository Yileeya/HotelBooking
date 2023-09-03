<template>
  <div id="carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        v-for="indicatorIndex in imageUrl.length"
        :key="'indicator' + indicatorIndex"
        type="button"
        data-bs-target="#carousel"
        :data-bs-slide-to="indicatorIndex - 1"
        :class="[{ active: indicatorIndex - 1 === 0 }]"
        aria-current="true"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        class="carousel-item"
        v-for="(img, index) in imageUrl"
        :key="'img' + img"
        :class="[{ active: index === 0 }]"
        @click.prevent="showMultiple(index)"
      >
        <img :src="img" class="d-block w-100" :alt="`房間圖片${index + 1}`" />
      </div>
    </div>
    <button
      v-for="i in 2"
      :key="'control-btn' + i"
      class="carousel-control-btn"
      :class="[i === 1 ? 'carousel-control-prev' : 'carousel-control-next']"
      type="button"
      data-bs-target="#carousel"
      :data-bs-slide="[i === 1 ? 'prev' : 'next']"
    >
      <span
        :class="[i === 1 ? 'carousel-control-prev-icon' : 'carousel-control-next-icon']"
        aria-hidden="true"
      >
        <i class="fa" :class="i === 1 ? 'fa-angle-left' : 'fa-angle-right'" />
      </span>
      <span class="visually-hidden">{{ i === 1 ? 'Previous' : 'Next' }}</span>
    </button>
  </div>
  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="imageUrl"
    :index="indexRef"
    @hide="visibleRef = false"
  ></vue-easy-lightbox>
</template>

<script setup lang="ts">
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
import VueEasyLightbox from 'vue-easy-lightbox'
import { ref } from 'vue'

defineProps({
  imageUrl: {
    type: Array as () => Array<string>,
    default: () => []
  }
})
const visibleRef = ref(false)
const indexRef = ref(0) // default 0

const showMultiple = (imgIndex: number) => {
  indexRef.value = imgIndex //圖片順序
  visibleRef.value = true
}
</script>

<style scoped lang="scss">
$gray: #74797c;
.carousel-inner {
  max-height: 70vh;
  min-height: 450px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.carousel-indicators button {
  border-radius: 100%;
  height: 10px;
  width: 10px;
  background-color: $gray;
  margin: 0 6px;
}

.carousel-control-btn {
  span {
    background-image: none;
  }

  .fa {
    color: $gray;
    font-size: 50px;
    margin: -8px 0;
  }
}
.vel-modal {
  background: rgba(0, 0, 0, 0.9);
}
</style>
