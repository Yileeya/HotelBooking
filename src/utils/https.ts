import axios from 'axios';
import router from '@/router/index';

declare module 'axios' {
  //TS2339: Property 'result' does not exist on type 'AxiosResponse '.
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

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
          alert('出現錯誤');
          console.log(data.message);
          break;
        }
        case 401:
        case 405:
        case 403:
          alert('權限不足');
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
          alert('網路出了點問題，請重新連線後刷新頁面');
          console.log(data.message);
          break;
        default:
          alert(`${data.message || '網路出了點問題，請重新連線後刷新頁面'}`);
          console.log(data.message);
      }
    }
    if (!window.navigator.onLine) {
      alert('網路出了點問題，請重新連線後刷新頁面');
      return;
    }
    return Promise.reject(error);
  }
);

export default https;
