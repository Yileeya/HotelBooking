import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home/HomeLayout.vue')
      }
    ]
  }
]
export default routes
