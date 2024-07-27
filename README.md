# The F2E 2nd - 第六關 - 旅館預約服務
線上網址：https://yileeya.github.io/HotelBooking

![image](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_ff118dade1a7f2362578ec9aa39756d5.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1722095693&Signature=YfASmx0KA42pTXz7oS1yp5knJ94%3D)

![image](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_04dcc54f390393e081963d6498545e96.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1722095308&Signature=Pj%2Fal%2FD7gIXSYcvkXqeJ0z94H2A%3D)

## 作品說明
* [The F2E 2nd - 第六關 - 旅館預約服務題目](https://challenge.thef2e.com/news/17)
* [感謝 Lauren 的設計稿](https://challenge.thef2e.com/user/2095?schedule=3863#works-3863)
* [旅館 API](https://github.com/Yileeya/HotelApi)
* 使用vue3+ts開發，api在無呼叫時會進入休眠，重新啟動需約1-3分鐘，請耐心等候。

作品為旅館預約服務，首頁可見所有房型，點擊即可進入房型介紹頁面。 
使用者於日曆上選擇起訖日期，並填寫姓名、電話、email、人數，即可預約訂房。

## 系統說明
Node: 建議 v20 以上

### Setup
```bash
# npm
npm install
```
### Development Server
```bash
# npm
npm run dev
```
### Production
```bash
# npm
npm run build
```

## 檔案結構
- apis(管理所有 API)
- assets(scss、圖片等)
- components(共用元件)
- plugins(第三方引入的插件)
- router(路由配置及相關邏輯處理)
- stores(pinia配置)
- types(TS interface)
- utils(工具函數)
- views(頁面)
- app.vue
- main.ts(入口)

## 使用技術
* [Vue3](https://vuejs.org/)
* [Bootstrap5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
* [Pinia](https://pinia.vuejs.org)
* [Vue Router](https://router.vuejs.org/)
* [VeeValidate v4](https://vee-validate.logaretm.com/v4/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [eslint](https://eslint.org/)
* [prettier](https://prettier.io/)