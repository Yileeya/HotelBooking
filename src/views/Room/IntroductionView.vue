<template>
  <section class="info">
    <h2>{{ roomDetails?.name }}</h2>
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
  <p class="description">{{ roomDetails?.description }}</p>
  <section class="check-in-and-price">
    <h6>
      Check-in:{{ roomDetails?.checkInAndOut.checkInEarly }} ~
      {{ roomDetails?.checkInAndOut.checkInLate }}
      <span />
      Check-out:{{ roomDetails?.checkInAndOut.checkOut }}
    </h6>
    <h6>
      Weekday(Mon-Thu):${{ !roomDetails || priceAddCommas(roomDetails.normalDayPrice) }}
      <span />
      Weekend(Fri-Sun):${{ !roomDetails || priceAddCommas(roomDetails.holidayPrice) }}
    </h6>
  </section>
</template>

<script setup lang="ts">
import type { DescriptionShort, CheckInAndOut, RoomDetails } from '@/types/roomDetail'
import GuestSvg from '@/assets/iconSvg/GuestSvg.vue'
import BedSvg from '@/assets/iconSvg/BedSvg.vue'
import BathSvg from '@/assets/iconSvg/BathSvg.vue'
import FootageSvg from '@/assets/iconSvg/FootageSvg.vue'
import { priceAddCommas } from '@/utils/priceAddCommas'

interface RoomDetailInfo extends RoomDetails {
  descriptionShort: DescriptionShort
  checkInAndOut: CheckInAndOut
}

const props = defineProps<{
  roomDetails: RoomDetailInfo | null
}>()

const descriptionShort = props.roomDetails?.descriptionShort
const descriptionShortItem = !descriptionShort
  ? []
  : [
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
