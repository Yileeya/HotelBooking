<template>
  <section class="amenities">
    <div
      v-for="amenity in amenitiesItems"
      :key="amenity.key"
      class="amenity"
      :class="[{ disabled: !amenities?.[amenity.key] }]"
    >
      <component :is="amenity.svgIcon" />
      {{ amenity.name }}
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Amenities } from '@/types/roomDetail'
import MiniBarSvg from '@/assets/iconSvg/MiniBarSvg.vue'
import WifiSvg from '@/assets/iconSvg/WifiSvg.vue'
import SmokeSvg from '@/assets/iconSvg/SmokeSvg.vue'
import AirConditionerSvg from '@/assets/iconSvg/AirConditionerSvg.vue'
import RoomServiceSvg from '@/assets/iconSvg/RoomServiceSvg.vue'
import SofaSvg from '@/assets/iconSvg/SofaSvg.vue'
import PetsSvg from '@/assets/iconSvg/PetsSvg.vue'
import ScenerySvg from '@/assets/iconSvg/ScenerySvg.vue'
import TelevisionSvg from '@/assets/iconSvg/TelevisionSvg.vue'
import BreakfastSvg from '@/assets/iconSvg/BreakfastSvg.vue'
import FridgeSvg from '@/assets/iconSvg/FridgeSvg.vue'
import ChildrenSvg from '@/assets/iconSvg/ChildrenSvg.vue'

defineProps<{
  amenities: Amenities | null
}>()

interface Amenity {
  key: string
  name: string
  [key: string]: any
}

let amenitiesItems: Array<Amenity> = []
amenitiesItems = [
  {
    name: 'Mini bar',
    key: 'Mini-Bar',
    svgIcon: MiniBarSvg
  },
  {
    name: 'Wifi',
    key: 'Wi-Fi',
    svgIcon: WifiSvg
  },
  {
    name: 'Smoke',
    key: 'Smoke-Free',
    svgIcon: SmokeSvg
  },
  {
    name: 'AC',
    key: 'Air-Conditioner',
    svgIcon: AirConditionerSvg
  },
  {
    name: 'Room Service',
    key: 'Room-Service',
    svgIcon: RoomServiceSvg
  },
  {
    name: 'Sofa',
    key: 'Sofa',
    svgIcon: SofaSvg
  },
  {
    name: 'Pets',
    key: 'Pet-Friendly',
    svgIcon: PetsSvg
  },
  {
    name: 'Scenery',
    key: 'Great-View',
    svgIcon: ScenerySvg
  },
  {
    name: 'TV',
    key: 'Television',
    svgIcon: TelevisionSvg
  },
  {
    name: 'Breakfast',
    key: 'Breakfast',
    svgIcon: BreakfastSvg
  },
  {
    name: 'Fridge',
    key: 'Refrigerator',
    svgIcon: FridgeSvg
  },
  {
    name: 'Children',
    key: 'Child-Friendly',
    svgIcon: ChildrenSvg
  }
]
</script>

<style scoped lang="scss">
.amenities {
  margin-top: 2rem;
  color: #272e31;
  background: rgba(248, 248, 248, 0.71);
  padding: 2rem 5px;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;

  .disabled {
    color: #c2c2c2;
  }

  .amenity {
    flex: 0 0 25%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
}
</style>
