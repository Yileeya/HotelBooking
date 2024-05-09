<template>
  <Carousel :image-urls="roomStore.imageUrlList" />
  <section class="room-detail-container">
    <Introduction class="introduction" :room-details="roomStore.roomDetail" />
    <FacilityInformation :facility-info="roomStore.facilityInfo" />
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRoomStore } from '@/stores/bookingRoom';
import Carousel from '@/components/Room/Carousel.vue';
import Introduction from '@/components/Room/Introduction.vue';
import FacilityInformation from '@/components/Room/FacilityInformation.vue';

const route = useRoute();
const routeParamsId = route.params.id.toString();

//獲取房間資料
const roomStore = useRoomStore();
roomStore.fetchRoom(routeParamsId);
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

.room-detail-container {
  max-width: 992px;
  margin: auto;
  .introduction {
    margin: 2rem 0;
  }
}
</style>
