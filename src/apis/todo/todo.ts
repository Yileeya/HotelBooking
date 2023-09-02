import https from '@/utils/https'

export const getTodoApi = async () => {
  return await https.get(`/rooms`)
}
