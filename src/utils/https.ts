import axios from 'axios';
import router from '@/router/index';
import { useToast } from 'vue-toastification';

declare module 'axios' {
  //TS2339: Property 'result' does not exist on type 'AxiosResponse '.
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
const Toast = useToast();
const https = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

https.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      switch (error.response.status) {
        //可以在這裡針對不同 status code 做處理
        case 400: {
          Toast.error(`${data.message || '資料獲取錯誤，請稍後再試。'}`);
          console.log(data.message);
          break;
        }
        case 401:
        case 405:
        case 403:
          Toast.error('權限不足。');
          console.log(data.message);
          break;
        case 404:
          alert('頁面不存在');
          router.push({
            path: '/'
          });
          console.log(data.message);
          break;
        case 500:
          Toast.error('網路出了點問題，請重新連線後刷新頁面。');
          console.log(data.message);
          break;
        default:
          Toast.error(`${data.message || '網路出了點問題，請重新連線後刷新頁面'}`);
          console.log(data.message);
      }
    }
    if (!window.navigator.onLine) {
      Toast.error('網路出了點問題，請重新連線後刷新頁面');
      return;
    }
    return Promise.reject(error);
  }
);

export default https;
