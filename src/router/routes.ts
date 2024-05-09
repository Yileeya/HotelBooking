import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/room/:id',
        name: 'room',
        component: () => import('@/views/Room.vue')
      }
    ]
  }
];
export default routes;
