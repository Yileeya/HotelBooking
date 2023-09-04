interface Amenities {
    'Air-Conditioner': boolean
    'Breakfast': boolean
    'Child-Friendly': boolean
    'Great-View': boolean
    'Mini-Bar': boolean
    'Pet-Friendly': boolean
    'Refrigerator': boolean
    'Room-Service': boolean
    'Smoke-Free': boolean
    'Sofa': boolean
    'Television': boolean
    'Wi-Fi': boolean
    [key: string]: boolean
}

interface CheckInAndOut {
    'checkInEarly': string
    'checkInLate': string
    'checkOut': string
}

interface DescriptionShort {
    'Bed': Array<string>
    'Footage': number
    'GuestMax': number
    'GuestMin': number
    'Private-Bath': number
}

interface RoomDetails {
    'id': string
    'name': string
    'checkInAndOut': CheckInAndOut
    'description': string
    'descriptionShort': DescriptionShort
    'normalDayPrice': number
    'holidayPrice': number
}

export type {Amenities, CheckInAndOut, DescriptionShort, RoomDetails};