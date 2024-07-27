<template>
  <section class="facilities">
    <div
      v-for="facility in facilityItems"
      :key="facility.name"
      class="facility"
      :class="[{ disabled: !findMatchFacilityValue(facility.name) }]"
    >
      <component :is="facility.svgIcon" />
      {{ facility.name }}
    </div>
  </section>
</template>

<script setup lang="ts">
import MiniBarSvg from '@/assets/iconSvg/MiniBarSvg.vue';
import WifiSvg from '@/assets/iconSvg/WifiSvg.vue';
import AirConditionerSvg from '@/assets/iconSvg/AirConditionerSvg.vue';
import RoomServiceSvg from '@/assets/iconSvg/RoomServiceSvg.vue';
import SofaSvg from '@/assets/iconSvg/SofaSvg.vue';
import ScenerySvg from '@/assets/iconSvg/ScenerySvg.vue';
import BreakfastSvg from '@/assets/iconSvg/BreakfastSvg.vue';
import type { IFacility } from '@/types/roomDetail';

interface Props {
  facilityInfo: IFacility[];
}

const props = withDefaults(defineProps<Props>(), {
  facilityInfo: () => []
});

interface IFacilityItem {
  name: string;
  svgIcon: any;
}

const facilityItems: IFacilityItem[] = [
  {
    name: 'Mini bar',
    svgIcon: MiniBarSvg
  },
  {
    name: 'Wifi',
    svgIcon: WifiSvg
  },
  {
    name: 'AC',
    svgIcon: AirConditionerSvg
  },
  {
    name: 'Room Service',
    svgIcon: RoomServiceSvg
  },
  {
    name: 'Sofa',
    svgIcon: SofaSvg
  },
  {
    name: 'Scenery',
    svgIcon: ScenerySvg
  },
  {
    name: 'Breakfast',
    svgIcon: BreakfastSvg
  }
];
const findMatchFacilityValue = (name: string): boolean => {
  if (!name) return false;
  const match = props.facilityInfo.find((item) => item.title === name);
  return match?.isProvide || false;
};
</script>

<style scoped lang="scss">
.facilities {
  margin-top: 2rem;
  color: #272e31;
  background: rgba(248, 248, 248, 0.71);
  padding: 2rem 1rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;

  .disabled {
    color: #c2c2c2;
  }

  .facility {
    flex: 0 0 25%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
  @media (max-width: 768px) {
    padding: 1rem;
    .facility {
      flex: 0 0 50%;
    }
  }
}
</style>
