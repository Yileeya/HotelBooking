<template>
  <div class="room-card" @click.prevent="changeRouterPath">
    <div class="image-container">
      <img :src="room.imageUrl" :alt="room.name" />
    </div>
    <h4>{{ room.name }}</h4>
  </div>
</template>

<script setup lang="ts">
import type { IRoom } from '@/types/room';
import { useRouter } from 'vue-router';

const props = defineProps<{
  room: IRoom;
}>();

const router = useRouter();
const changeRouterPath = () => {
  router.push(`/room/${props.room._id}`);
};
</script>

<style scoped lang="scss">
.room-card {
  text-align: center;

  .image-container {
    width: calc(100% + 0.5rem);
    max-height: 250px;
    overflow: hidden;
    position: relative;
    text-align: center;
    border-left: 0.5rem solid;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    img {
      width: 100%;
      height: 100%;
      min-height: 250px;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.3);
        cursor: pointer;
      }
    }
  }

  h4 {
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    .image-container {
      width: 100%;
      max-height: 200px;
    }
  }
}
</style>
