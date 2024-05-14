import https from '@/utils/https';
import type { IOrder } from '@/types/orders';

export const postOrderApi = async (form: IOrder) => {
  return await https.post('/orders', {
    ...form
  });
};