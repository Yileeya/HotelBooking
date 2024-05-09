import type { RouteLocationNormalized } from 'vue-router';

export function beforeEach(to: RouteLocationNormalized, from: any, next: any) {
  next();
}
