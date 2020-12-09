import {format, setHours, endOfDay, isValid, subHours} from 'date-fns';

const formatPattern = {
  yyyyMMddHHmmss: 'yyyy-MM-dd HH:mm:ss',
  yyyyMMdd: 'yyyy-MM-dd',
};

const toDateStr = (dbDate: string | Date | number | null | undefined, p = formatPattern.yyyyMMddHHmmss) => {
  if (!dbDate) {
    return '';
  }
  return format(new Date(dbDate), p);
};
const nowStr = (p = formatPattern.yyyyMMddHHmmss) => format(new Date(), p);
export {format, toDateStr, formatPattern, nowStr, setHours, endOfDay, isValid, subHours};
