import {format, setHours, endOfDay, isValid, subHours, isAfter} from 'date-fns';
import {startHour} from '../config';

const formatPattern = {
  yyyyMMddHHmmss: 'yyyy/MM/dd HH:mm:ss',
  yyyyMMdd: 'yyyy/MM/dd',
};

const toDateStr = (dbDate: string | Date | number | null | undefined, p = formatPattern.yyyyMMddHHmmss) => {
  if (!dbDate) {
    return '';
  }
  return format(new Date(dbDate), p);
};

const toDateOnly = (dbDate: string | Date | number | null | undefined, p = formatPattern.yyyyMMddHHmmss) => {
  const dateStr = toDateStr(dbDate);
  if (!dateStr) {
    return '';
  }
  return dateStr.split(' ')[0];
};
const nowStr = (p = formatPattern.yyyyMMddHHmmss) => format(new Date(), p);
const startCheckingDateStr = (date: Date) => toDateStr(setHours(new Date(toDateOnly(date)), startHour));
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
  startCheckingDateStr,
};
