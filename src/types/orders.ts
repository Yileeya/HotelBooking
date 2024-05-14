export interface IUserInfo {
  name: string;
  phone: string;
  email: string;
}

export interface IOrder {
  roomId: string;
  peopleNum: number;
  userInfo: IUserInfo;
  days: string[];
}