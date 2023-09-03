interface Amenities {
    'Air-Conditioner': Boolean
    'Breakfast': Boolean
    'Child-Friendly': Boolean
    'Great-View': Boolean
    'Mini-Bar': Boolean
    'Pet-Friendly': Boolean
    'Refrigerator': Boolean
    'Room-Service': Boolean
    'Smoke-Free': Boolean
    'Sofa': Boolean
    'Television': Boolean
    'Wi-Fi': Boolean
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

interface RoomDetail {
    'id': string
    'name': string
    'amenities': Amenities
    'checkInAndOut': CheckInAndOut
    'description': string
    'descriptionShort': DescriptionShort
    'normalDayPrice': number
    'holidayPrice': number
    'imageUrl': Array<string>
}

export type {Amenities, CheckInAndOut, DescriptionShort, RoomDetail};