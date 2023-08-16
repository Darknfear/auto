import * as moment from 'moment-timezone';

export const formatTimestampToDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toISOString();
};

export const getListMonthViewReport = (startDate: Date, endDate: Date) => {
  const listMonth: string[] = [];
  const start = moment(startDate);
  const end = moment(endDate).endOf('M');
  while (start.isSameOrBefore(end)) {
    listMonth.push(start.format('MMM YYYY'));
    start.add(1, 'month');
  }

  return listMonth;
};

export const getTimezoneOffset = (timezone: string) =>
  moment().tz(timezone).format('Z');
