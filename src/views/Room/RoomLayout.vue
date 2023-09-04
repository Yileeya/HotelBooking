<template>
  <header>
    <img src="@/assets/img/icon.svg" alt="icon" @click.prevent="router.push('/')" />
  </header>
  <section v-if="room">
    <CarouselView :image-url="room.imageUrl" />
    <div style="width: 50%; padding: 30px">
      <IntroductionView :room-details="room.roomDetails" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import type { RoomDetails, Amenities } from '@/types/roomDetail'
import { getSingleRoomApi } from '@/apis/rooms'
import CarouselView from '@/views/Room/CarouselView.vue'
import IntroductionView from '@/views/Room/IntroductionView.vue'

const Toast = useToast()

const route = useRoute()
const router = useRouter()
const routeParamsId = route.params.id.toString()

interface Room {
  roomDetails: RoomDetails
  imageUrl: Array<string>
  amenities: Amenities
}

const room = ref<Room | null>(null)
const fetchSingleRoomApi = async () => {
  try {
    let res = await getSingleRoomApi(routeParamsId)
    if (res.status === 200) {
      const { imageUrl, amenities, ...roomDetails } = res.data.room[0]
      room.value = {
        imageUrl: imageUrl,
        amenities: amenities,
        roomDetails: roomDetails
      }
    }
  } catch (error) {
    Toast.error('資料獲取錯誤，請稍後再試。')
  }
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
