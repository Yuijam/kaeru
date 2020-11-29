import {format} from 'date-fns';

const formatPattern = {
  yyyyMMddHHmmss: 'yyyy-MM-dd HH:mm:ss',
  yyyyMMdd: 'yyyy-MM-dd',
};

const toDateStr = (dbDate: string, p = formatPattern.yyyyMMddHHmmss) => format(new Date(dbDate), p);
const nowStr = (p = formatPattern.yyyyMMddHHmmss) => format(new Date(), p);
export {format, toDateStr, formatPattern, nowStr};
