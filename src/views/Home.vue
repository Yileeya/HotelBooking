<template>
  <Banner />
  <ScrollDownButton />
  <div class="rooms-intro-area container">
    <RoomCard v-for="room in rooms" :key="room._id" :room="room" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Banner from '@/components/Home/Banner.vue';
import RoomCard from '@/components/Home/RoomCard.vue';
import ScrollDownButton from '@/components/ScrollDownButton.vue';
import type { IRoom } from '@/types/room';
import { getAllRoomsApi } from '@/apis/rooms';
import { useToast } from 'vue-toastification';
import { useUIUXStore } from '@/stores/uiux';

const Toast = useToast();
const uiuxStore = useUIUXStore();

const rooms = ref<Array<IRoom>>([]);

const fetchAllRooms = async () => {
  uiuxStore.loadingChanged(true);
  try {
    let res = await getAllRoomsApi();
    if (res.status) rooms.value = res.result;
  } catch (error) {
    Toast.error('資料獲取錯誤，請稍後再試。');
  }
  uiuxStore.loadingChanged(false);
};

fetchAllRooms();
</script>

<style scoped lang="scss">
.rooms-intro-area {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  margin: 5rem auto 4em;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 4rem auto 2rem;
  }
}
</style>
