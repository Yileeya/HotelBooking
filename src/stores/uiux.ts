import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUIUXStore = defineStore('uiux', () => {
  const loading = ref<boolean>(false);
  let loadingStartTime: number | null = null;

  const loadingChanged = (status: boolean) => {
    if (status) {
      loadingStartTime = Date.now(); // 計時
      loading.value = true;
    } else {
      const elapsedTime = Date.now() - (loadingStartTime || 0);
      const minimumDelay = 3000; // 最少維持秒數

      if (elapsedTime < minimumDelay) {
        //未滿秒數，延遲處理
        const remainingTime = minimumDelay - elapsedTime;

        setTimeout(() => {
          loading.value = false;
        }, remainingTime);
      } else {
        loading.value = false;
      }
    }
  };

  return { loading, loadingChanged };
});
