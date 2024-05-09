<template>
  <div>
    <section class="info">
      <h2>{{ roomDetails.name }}</h2>
      <div class="description-short">
        <div
          class="description-short-icon"
          v-for="introShortItem in introShortItemsArray"
          :key="introShortItem.name"
        >
          <component :is="introShortItem.svgIcon" />
          {{ introShortItem.value }}
        </div>
      </div>
    </section>
    <p class="description">{{ roomDetails.description }}</p>
    <section class="check-in-and-price">
      <h6>
        Check-in:{{ roomDetails.checkIn }}
        <span />
        Check-out:{{ roomDetails.checkOut }}
      </h6>
      <h6>
        Weekday(Mon-Thu):{{ priceAddCommas(roomDetails.weekdayPrice, '$') }}
        <span />
        Weekend(Fri-Sun):{{ priceAddCommas(roomDetails.weekendPrice, '$') }}
      </h6>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { IRoomDetail } from '@/types/roomDetail';
import { computed } from 'vue';
import GuestSvg from '@/assets/iconSvg/GuestSvg.vue';
import BedSvg from '@/assets/iconSvg/BedSvg.vue';
import FootageSvg from '@/assets/iconSvg/FootageSvg.vue';
import { priceAddCommas } from '@/utils/priceAddCommas';

interface Props {
  roomDetails: IRoomDetail;
}

const props = withDefaults(defineProps<Props>(), {
  roomDetails: () => ({
    _id: '',
    name: '',
    description: '',
    areaInfo: 0,
    bedInfo: '',
    maxPeople: 0,
    checkIn: '',
    checkOut: '',
    weekdayPrice: 0,
    weekendPrice: 0
  })
});

//組成介紹icon內容
interface IntroShortItem {
  name: keyof IRoomDetail; // 限制 name 的型別為 IRoomDetail 的鍵之一
  svgIcon: any;
}
const introShortItems: IntroShortItem[] = [
  {
    name: 'maxPeople',
    svgIcon: GuestSvg
  },
  {
    name: 'bedInfo',
    svgIcon: BedSvg
  },
  {
    name: 'areaInfo',
    svgIcon: FootageSvg
  }
];
const introShortItemsArray = computed(() => {
  return introShortItems.map((item) => {
    return { ...item, value: props.roomDetails[item.name as keyof IRoomDetail] };
  });
});
</script>

<style scoped lang="scss">
.info {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;

  .description-short {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;

    .description-short-icon {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
}

.description {
  margin: 2rem 0;
}

.check-in-and-price {
  h6 {
    font-size: 18px;
  }

  span::before {
    content: '/';
  }
}
</style>
