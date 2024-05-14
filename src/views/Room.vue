<template>
  <header>
    <img src="@/assets/img/icon.svg" alt="icon" @click.prevent="router.push('/')" />
  </header>
  <Carousel :image-urls="roomStore.imageUrlList" />
  <section class="room-detail-container">
    <Introduction class="introduction" :room-details="roomStore.roomDetail" />
    <FacilityInformation :facility-info="roomStore.facilityInfo" />
    <section class="order-area">
      <div class="day-price-area">
        <DateRangePicker
          :disabled-days="roomStore.bookedDays"
          @update-between-dates="setDaysPrice"
        />
        <div class="prices">
          <p title="Room">
            <span>{{ prices.default }}</span>
          </p>
          <p title="Tax">
            <span :style="{ width: `${prices.width}px` }">{{ prices.tax }}</span>
          </p>
          <p title="Total">
            <span id="PriceTotalWidth">{{ prices.total }}</span>
          </p>
        </div>
      </div>
      <reservation-form
        v-model:people="peopleNumber"
        :max-people="roomStore.roomDetail.maxPeople"
        :is-select-date-range="!!selectDateRange.length"
        @submit="submitForm"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useRoomStore } from '@/stores/bookingRoom';
import Carousel from '@/components/Room/Carousel.vue';
import Introduction from '@/components/Room/Introduction.vue';
import FacilityInformation from '@/components/Room/FacilityInformation.vue';
import DateRangePicker from '@/components/DateRangePicker.vue';
import ReservationForm from '@/components/Room/ReservationForm.vue';
import { priceAddCommas } from '@/utils/priceAddCommas';
import { calculateDaysPrice } from '@/utils/daysControlMehods';
import type { IUserInfo, IOrder } from '@/types/orders';
import { postOrderApi } from '@/apis/orders';

const route = useRoute();
const routeParamsId = route.params.id.toString();

const peopleNumber = ref<number>(1);
const selectDateRange = ref<string[]>([]);

//價格計算
const prices = ref<{
  default: string;
  tax: string;
  total: string;
  width: number;
}>({
  default: '0',
  tax: '0',
  total: '0',
  width: 50
});

//獲取房間資料
const roomStore = useRoomStore();
roomStore.fetchRoom(routeParamsId);

//計算住宿金額
const setDaysPrice = (betweenDates: string[]) => {
  selectDateRange.value = [...betweenDates];
  const roomPrice = calculateDaysPrice(
    betweenDates,
    roomStore.roomDetail.weekdayPrice,
    roomStore.roomDetail.weekendPrice
  );
  prices.value.default = priceAddCommas(roomPrice);
  prices.value.tax = priceAddCommas(Math.ceil(roomPrice * 0.05));
  prices.value.total = priceAddCommas(roomPrice + Math.ceil(roomPrice * 0.05));
  nextTick(() => {
    const priceElement = document.getElementById('PriceTotalWidth') as HTMLElement | null;
    prices.value.width = priceElement ? priceElement.getBoundingClientRect().width : 0;
  });
};

const submitForm = async (userInfoForm: IUserInfo) => {
  const submitForm: IOrder = {
    roomId: routeParamsId,
    peopleNum: peopleNumber.value,
    userInfo: userInfoForm,
    days: selectDateRange.value
  };
  await postOrderApi(submitForm);
};
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

.order-area {
  display: flex;
  gap: 60px;
  margin: 60px 0 30px;

  .day-price-area {
    width: 294px;

    .prices {
      padding-bottom: 15px;

      p {
        display: flex;
        justify-content: space-between;
        margin: 0;

        &:before {
          content: attr(title);
        }

        &:nth-child(2) {
          margin-top: 10px;
          margin-bottom: 20px;
        }

        &:last-child {
          color: #273036;
        }

        span {
          display: flex;
          justify-content: space-between;
          gap: 5px;
          min-width: 50px;

          &:before {
            content: 'NT$';
          }
        }
      }
    }
  }

  .reservation-form {
    flex: 1;
    background: #f8f8f8;
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
