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
  yyyyMMddHHmmss: 'YYYY-MM-DD HH:mm:ss',
  yyyyMMdd: 'YYYY-MM-DD',
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
  if (!isToday(today)) {
    return toDateStr(endOfDay(today));
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
