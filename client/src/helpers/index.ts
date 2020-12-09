import { TLineDesData, TPeriod, TLineItemData } from '../types';
import { LineRecord } from '../generated/graphql-types';
import { isValid, setHours, nowStr } from 'shared/lib/dateFns';
import { startHour, getLineName } from 'shared/config';

export const distanceHours = (d1: string | Date, d2: string | Date) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  if (!isValid(date1) || !isValid(date2)) {
    console.log(`inValid date ${d1}, ${d2}`);
    throw 'toLineDes err';
  }
  const hours = Math.abs(date1.getTime() - date2.getTime()) / 3600000;
  return parseFloat(hours.toFixed(1));
};

const toPeriod = (pre: LineRecord, cur: LineRecord): TPeriod => {
  if (!pre) {
    const hours = distanceHours(setHours(new Date(), startHour), cur.createdAt);
    return { time: hours, statusCd: cur.statusCd };
  }
  const hours = distanceHours(pre.createdAt, cur.createdAt);
  return { time: hours, statusCd: cur.statusCd };
};

export const toLineItemData = (lineRecords: LineRecord[]): TLineItemData => {
  if (lineRecords.length < 1) {
    return undefined;
  }
  const lineName = getLineName(lineRecords[0].lineId);
  const lineDes = toLineDes(lineRecords);
  return { lineName, lineDes };
};

const toNowLineRecords = (lineRecords: LineRecord[]): LineRecord[] => {
  if (lineRecords.length < 1) {
    return [];
  }
  const last = lineRecords[lineRecords.length - 1];
  const nowLast = { ...last, createdAt: nowStr() };
  return [...lineRecords.slice(0, -1), nowLast];
};

const toLineDes = (lineRecords: LineRecord[]): TLineDesData => {
  const nowLineRecords = toNowLineRecords(lineRecords);
  const { res } = nowLineRecords.reduce((acc, cur) => {
    const { pre, res = [] } = acc;
    return { res: [...res, toPeriod(pre, cur)], pre: cur };
  }, {} as { res: TPeriod[]; pre: LineRecord });
  return res;
};

export const toLineData = (lineRecords: LineRecord[][]) =>
  lineRecords.map((lineRecord) => toLineItemData(lineRecord));
