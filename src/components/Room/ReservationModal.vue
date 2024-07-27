<template>
  <div
    class="modal"
    :class="{ show: showModal }"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center fa-div"><i class="fa fa-check-circle-o fa-3x" /></div>
          <p>
            We have received your reservation for a <b>{{ roomName }}</b> from <b> {{ dateRange[0] || '' }}</b>, to <b>{{ endDate }}</b>, at a total rate of <b> NT$ {{ price }}</b>.
          </p>
          <p>Should you have any questions or special requests, please feel free to contact us.</p>
        </div>
        <button
          class="btn btn-theme confirm-btn"
          @click="$emit('closeModal')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = withDefaults(
  defineProps<{
    roomName?: string;
    price?: string;
    dateRange?: string[];
  }>(),
  {
    roomName: '',
    price: '',
    dateRange: () => []
  }
);
defineEmits(['closeModal']);

const showModal = defineModel({
  default: false
});

const endDate = computed<string>(() => {
  if (!props.dateRange.length) return '';
  let prevLastDate = props.dateRange[props.dateRange.length - 1];
  return dayjs(prevLastDate).add(1, 'day').format('YYYY-MM-DD');
});
</script>

<style scoped lang="scss">
.modal {
  background: rgba(71, 71, 71, 0.8);
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s ease, visibility 0.5s;
  &.show {
    visibility: visible;
    opacity: 1;
    .modal-dialog {
      transform: translate(0, 0);
    }
  }
  .modal-dialog {
    transform: translate(0, -50px);
    transition: transform 0.5s ease;
  }
  .modal-content {
    border: none;
    box-shadow: 1px 2px 2px #f8f8f8;
    padding: 10px;
    display: flex;
    align-items: flex-end;
    .fa-div {
      margin-bottom: 10px;
      .fa {
        color: green;
      }
    }
    .confirm-btn {
      margin: 0 10px 5px;
    }
  }
}
</style>
