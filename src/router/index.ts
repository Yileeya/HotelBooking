import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { beforeEach } from './routerGuard';

const allRoutes = [
  ...routes,
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
  }
});

// 設定導航守衛
router.beforeEach(beforeEach);

export default router;
