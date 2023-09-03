<template>
  <header>
    <img src="@/assets/img/icon.svg" alt="icon" @click.prevent="router.push('/')" />
  </header>
  <section v-if="room">
    <CarouselView :image-url="room.imageUrl" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import type { RoomDetail } from '@/types/roomDetail'
import { getSingleRoomApi } from '@/apis/rooms'
import CarouselView from '@/views/Room/CarouselView.vue'

const Toast = useToast()

const route = useRoute()
const router = useRouter()
const routeParamsId = route.params.id.toString()

const room = ref<RoomDetail | null>(null)
const fetchSingleRoomApi = async () => {
  try {
    let res = await getSingleRoomApi(routeParamsId)
    console.log(res)
    if (res.status === 200) {
      room.value = res.data.room[0]
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
