import type { RouteLocationNormalized } from 'vue-router'
import { useToast } from 'vue-toastification'
const Toast = useToast()

export function beforeEach(to: RouteLocationNormalized, from: any, next: any) {
  next()
}
