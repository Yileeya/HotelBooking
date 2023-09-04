<template>
  <section class="info">
    <h2>{{ roomDetail.name }}</h2>
    <div class="description-short">
      <div
        class="description-short-icon"
        v-for="descriptionShort in descriptionShortItem"
        :key="descriptionShort.name"
      >
        <component :is="descriptionShort.svgIcon" />
        {{ descriptionShort.value }}
      </div>
    </div>
  </section>
  <p class="description">{{ roomDetail.description }}</p>
  <section class="check-in-and-price">
    <h6>
      Check-in:{{ roomDetail.checkInAndOut.checkInEarly }} ~
      {{ roomDetail.checkInAndOut.checkInLate }}
      <span />
      Check-out:{{ roomDetail.checkInAndOut.checkOut }}
    </h6>
    <h6>
      Weekday(Mon-Thu):${{ priceAddCommas(roomDetail.normalDayPrice) }}
      <span />
      Weekend(Fri-Sun):${{ priceAddCommas(roomDetail.holidayPrice) }}
    </h6>
  </section>
</template>

<script setup lang="ts">
import type { DescriptionShort, CheckInAndOut } from '@/types/roomDetail'
import GuestSvg from '@/assets/iconSvg/GuestSvg.vue'
import BedSvg from '@/assets/iconSvg/BedSvg.vue'
import BathSvg from '@/assets/iconSvg/BathSvg.vue'
import FootageSvg from '@/assets/iconSvg/FootageSvg.vue'
import { priceAddCommas } from '@/utils/priceAddCommas'

interface RoomDetail {
  name: string
  descriptionShort: DescriptionShort
  description: number
  checkInAndOut: CheckInAndOut
  normalDayPrice: number
  holidayPrice: number
}

const props = defineProps<{
  roomDetail: RoomDetail
}>()

const descriptionShort = props.roomDetail.descriptionShort
const descriptionShortItem = [
  {
    name: 'Guest',
    value:
      descriptionShort.GuestMin === descriptionShort.GuestMax
        ? descriptionShort.GuestMin
        : descriptionShort.GuestMin + '-' + descriptionShort.GuestMax,
    svgIcon: GuestSvg
  },
  {
    name: 'Bed',
    value: descriptionShort.Bed.join(''),
    svgIcon: BedSvg
  },
  {
    name: 'Bath',
    value: descriptionShort['Private-Bath'],
    svgIcon: BathSvg
  },
  {
    name: 'Footage',
    value: `${descriptionShort.Footage} m²`,
    svgIcon: FootageSvg
  }
]
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
