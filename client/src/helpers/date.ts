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
  yyyyMMddHHmmss: 'yyyy/MM/dd HH:mm:ss',
  yyyyMMdd: 'yyyy/MM/dd',
  _yyyyMMddHHmmss: 'yyyy-MM-dd HH:mm:ss',
  _yyyyMMdd: 'yyyy-MM-dd',
  HHmm: 'HH:mm',
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
  const date =
    typeof today === 'string' || typeof today === 'number'
      ? new Date(today)
      : today;
  if (!isToday(date)) {
    return toDateStr(endOfDay(date));
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
