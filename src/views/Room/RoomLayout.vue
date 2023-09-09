<template>
  <header>
    <img src="@/assets/img/icon.svg" alt="icon" @click.prevent="router.push('/')" />
  </header>
  <section v-if="!loading">
    <CarouselView :image-url="bookingRoomStore.imageUrls" />
    <div style="display: flex">
      <div style="flex: 1; padding: 30px">
        <IntroductionView :room-details="bookingRoomStore.roomDetails" />
        <amenities-view :amenities="bookingRoomStore.amenities" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookingRoomStore } from '@/stores/bookingRoom'
import CarouselView from '@/views/Room/CarouselView.vue'
import IntroductionView from '@/views/Room/IntroductionView.vue'
import AmenitiesView from '@/views/Room/AmenitiesView.vue'

const loading = ref(true)

const route = useRoute()
const router = useRouter()
const routeParamsId = route.params.id.toString()

//獲取房間資料
const bookingRoomStore = useBookingRoomStore()

const fetchSingleRoomApi = async () => {
  loading.value = true
  await bookingRoomStore.fetchSingleRoomApi(routeParamsId)
  loading.value = false
}

fetchSingleRoomApi()
</script>

<style scoped lang="scss">
header {
  background: transparent;
  position: fixed;
  width: 100%;
  z-index: 9999;
  text-align: center;
  padding: 1rem 0;

  img:hover {
    cursor: pointer;
  }
}
</style>
