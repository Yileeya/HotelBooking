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
  <reservation-modal
    v-model="showConfirmModal"
    :price="prices?.total"
    :room-name="roomStore.roomDetail?.name"
    :date-range="selectDateRange"
    @closeModal="closeConfirmModal"
  />
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
import ReservationModal from '@/components/Room/ReservationModal.vue';
import { priceAddCommas } from '@/utils/priceAddCommas';
import { calculateDaysPrice } from '@/utils/daysControlMehods';
import type { IUserInfo, IOrder } from '@/types/orders';
import { postOrderApi } from '@/apis/orders';
import { useUIUXStore } from '@/stores/uiux';

const uiuxStore = useUIUXStore();

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
const showConfirmModal = ref<boolean>(false);

//獲取房間資料
const roomStore = useRoomStore();
roomStore.fetchRoom(routeParamsId);

//計算住宿金額
const setDaysPrice = (betweenDates: string[]) => {
  if (!betweenDates.length) {
    prices.value.default = '0';
    prices.value.tax = '0';
    prices.value.total = '0';
    prices.value.width = 50;
    return;
  }
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
  uiuxStore.loadingChanged(true);
  const submitForm: IOrder = {
    roomId: routeParamsId,
    peopleNum: peopleNumber.value,
    userInfo: userInfoForm,
    days: selectDateRange.value
  };
  try {
    let res = await postOrderApi(submitForm);
    if (res.status) {
      showConfirmModal.value = true;
    }
  } catch (error) {
    await uiuxStore.loadingChanged(false);
  }
};

const closeConfirmModal = () => {
  showConfirmModal.value = false;
  setTimeout(() => {
    router.push('/');
  }, 500);
};
</script>

<style scoped lang="scss">
header {
  background: transparent;
  position: fixed;
  width: 100%;
  z-index: 100;
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
  @media (max-width: 992px) {
    padding: 0 2rem;
  }
  @media (max-width: 768px) {
    padding: 0;
    max-width: 294px;
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
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    .day-price-area .prices {
      padding: 0 1rem;
    }
    .reservation-form {
      padding: 1rem;
    }
  }
}
</style>
