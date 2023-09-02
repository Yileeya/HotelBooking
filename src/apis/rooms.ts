import https from '@/utils/https'

export const getAllRoomsApi = async () => {
  return await https.get('/rooms')
}

export const getSingleRoomApi = async (id: string) => {
  return await https.get(`/room/${id}`)
}
