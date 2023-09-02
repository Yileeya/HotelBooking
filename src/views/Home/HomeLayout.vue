<template>
  <Banner />
  <ScrollDownButton />
  <div class="rooms-intro-area container">
    <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Banner from '@/views/Home/Banner.vue'
import RoomCard from '@/components/RoomCard.vue'
import ScrollDownButton from '@/components/ScrollDownButton.vue'
import demo from './demo'
import type { Room } from '@/types/room'

const rooms = ref<Array<Room>>(demo)
</script>

<style scoped lang="scss">
.rooms-intro-area {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  margin: 5rem auto 4em;
}
</style>
