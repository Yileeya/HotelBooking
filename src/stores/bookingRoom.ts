import { ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { getSingleRoomApi } from '@/apis/rooms';
import type { IFacility, IRoomDetail } from '@/types/roomDetail';
import { useUIUXStore } from '@/stores/uiux';
import { useToast } from 'vue-toastification';

export const useRoomStore = defineStore('room', () => {
  const uiuxStore = useUIUXStore();
  const Toast = useToast();

  const bookedDays: Ref<string[]> = ref([]);
  const imageUrlList: Ref<string[]> = ref([]);
  const facilityInfo: Ref<IFacility[]> = ref([]);
  const roomDetail = ref<IRoomDetail>({} as IRoomDetail);
  const fetchRoom = async (routeParamsId: string) => {
    uiuxStore.loadingChanged(true);
    try {
      const res = await getSingleRoomApi(routeParamsId);
      if (res.status) {
        const {
          imageUrlList: apiImageUrlList,
          facilityInfo: apiFacilityInfo,
          ...info
        } = res.result;
        imageUrlList.value = apiImageUrlList;
        facilityInfo.value = apiFacilityInfo;
        roomDetail.value = info;
        bookedDays.value = res.bookedDays;
      }
    } catch (error) {
      Toast.error('資料獲取錯誤，請稍後再試。');
    }
    uiuxStore.loadingChanged(false);
  };
  return { fetchRoom, bookedDays, imageUrlList, facilityInfo, roomDetail };
});
