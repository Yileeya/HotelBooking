<template>
  <Datepicker
    class="date-range-inline"
    v-model="dates"
    inline
    range
    auto-apply
    min-range="1"
    no-today
    hide-offset-dates
    :min-date="new Date()"
    :max-date="maxDate"
    prevent-min-max-navigation
    week-start="0"
    no-disabled-range
    :enable-time-picker="false"
    model-type="yyyy-MM-dd"
    :disabled-dates="disabledDays"
    @update:model-value="dateRangeChange"
    @invalid-date="onClickInvalidDate"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@/assets/dateInlinePicker.scss';
import { generateDatesBetween } from '@/utils/daysControlMehods';

withDefaults(defineProps<{ disabledDays: string[] }>(), {
  disabledDays: () => []
});

const emit = defineEmits<{
  updateBetweenDates: [dates: string[]];
}>();

const dates: Ref<string[]> = ref([]);

//不可超過90天
const maxDate: ComputedRef<Date> = computed(() => {
  const today = new Date();
  today.setDate(today.getDate() + 90);
  return today;
});

const dateRangeChange = (modelData: string[]) => {
  if (!modelData.length) return;
  const betweenDates: string[] = generateDatesBetween(modelData);
  emit('updateBetweenDates', betweenDates);
};

const onClickInvalidDate = () => { //重置清空
  dates.value = [];
  emit('updateBetweenDates', []);
};
</script>
