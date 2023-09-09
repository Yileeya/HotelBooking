import { defineStore } from 'pinia'
import type { Amenities, RoomDetails } from '@/types/roomDetail'
import { getSingleRoomApi } from '@/apis/rooms'
import { useToast } from 'vue-toastification'

const Toast = useToast()

export const useBookingRoomStore = defineStore('bookingRoom', {
  state: () => ({
    count: 0,
    roomDetails: null as RoomDetails | null,
    imageUrls: [] as Array<string> | [],
    amenities: null as Amenities | null
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    async fetchSingleRoomApi(routeParamsId: string) {
      try {
        const res = await getSingleRoomApi(routeParamsId)
        if (res.status === 200) {
          const { imageUrl, amenities, ...roomDetails } = res.data.room[0]
          this.imageUrls = imageUrl
          this.amenities = amenities
          this.roomDetails = roomDetails
        }
      } catch (error) {
        this.imageUrls = []
        this.amenities = null
        this.roomDetails = null
        Toast.error('資料獲取錯誤，請稍後再試。')
      }
    }
  }
})
