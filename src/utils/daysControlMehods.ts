import dayjs, { Dayjs } from 'dayjs';

/**
 * 生成兩個日期之間（不包括結束日期）的所有日期。
 * @param dateRange 日期起訖Array，如：['2024-01-01', '2024-01-03']
 * @returns 不包括結束的所有日期，如：['2024-01-01', '2024-01-02']
 */

export const generateDatesBetween = (dateRange: string[]): string[] => {
  if (!dateRange.length) return [];
  const startDate: Dayjs = dayjs(dateRange[0]);
  const endDate: Dayjs = dayjs(dateRange[1]);
  const totalDates: string[] = [];

  let currentDate: Dayjs = startDate;
  while (currentDate.isBefore(endDate)) {
    totalDates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return totalDates;
};

/**
 * 平日、假日價格計算
 * @param dateArray 全部日期Array，如：['2024-01-01', '2024-01-02']
 * @param weekdayPrice 平日價格，如：100
 * @param weekendPrice 假日(五、六、日)價格，如：500
 * @returns 總價格
 */
export const calculateDaysPrice = (
  dateArray: string[] = [],
  weekdayPrice: number = 0,
  weekendPrice: number = 0
): number => {
  let holidayCount = 0;
  let weekdayCount = 0;

  dateArray.forEach((dateString) => {
    const date = dayjs(dateString);
    // 如果是星期五、六或日，視為假日
    if (date.day() === 5 || date.day() === 6 || date.day() === 0) {
      holidayCount++;
    } else {
      weekdayCount++;
    }
  });

  const totalWeekendPrice = holidayCount * weekendPrice;
  const totalWeekdayPrice = weekdayCount * weekdayPrice;

  return totalWeekendPrice + totalWeekdayPrice;
};