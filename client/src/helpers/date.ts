import {
  format,
  setHours,
  endOfDay,
  isValid,
  subHours,
  isAfter,
  isToday,
} from 'date-fns';

const formatPattern = {
  yyyyMMddHHmmss: 'yyyy-MM-dd HH:mm:ss',
  yyyyMMdd: 'yyyy-MM-dd',
};

const toDateStr = (
  dbDate: string | Date | number | null | undefined,
  p = formatPattern.yyyyMMddHHmmss
) => {
  if (!dbDate) {
    return '';
  }
  return format(new Date(dbDate), p);
};

const toDateOnly = (date: string | Date | number | null | undefined) => {
  const dateStr = toDateStr(date, formatPattern.yyyyMMdd);
  if (!dateStr) {
    return '';
  }
  return dateStr.split(' ')[0];
};
const nowStr = (p = formatPattern.yyyyMMddHHmmss) => format(new Date(), p);

export const periodEndTime = (today: string | number | Date) => {
  const todayDate = new Date(today);
  if (!isToday(todayDate)) {
    return toDateStr(endOfDay(todayDate));
  }
  return nowStr();
};

export {
  format,
  toDateStr,
  formatPattern,
  nowStr,
  setHours,
  endOfDay,
  isValid,
  subHours,
  isAfter,
  toDateOnly,
};
