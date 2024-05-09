interface IRoomDetail {
  _id: string;
  name: string;
  description: string;
  areaInfo: number;
  bedInfo: string;
  maxPeople: number;
  checkIn: string;
  checkOut: string;
  weekdayPrice: number;
  weekendPrice: number;
  status?: number;
}

interface IFacility {
  title: string;
  isProvide: boolean;
}

export type { IFacility, IRoomDetail };
