import { TLineDesData, TPeriod, TLineItemData } from '../types';
import { LineRecord } from '../generated/graphql-types';
import { isValid, setHours, nowStr } from 'shared/lib/dateFns';
import { startHour, getLineName } from 'shared/config';

export const distanceMins = (d1: string | Date, d2: string | Date) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  if (!isValid(date1) || !isValid(date2)) {
    console.log(`inValid date ${d1}, ${d2}`);
    throw 'toLineDes err';
  }
  const min = Math.abs(date1.getTime() - date2.getTime()) / 60000;
  return parseFloat(min.toFixed(0));
};

const toPeriod = (pre: LineRecord, cur: LineRecord): TPeriod => {
  if (!pre) {
    const mins = distanceMins(
      setHours(new Date(nowStr().split(' ')[0]), startHour),
      cur.createdAt
    );
    return { time: mins, statusCd: 'NORMAL' };
  }
  const mins = distanceMins(pre.createdAt, cur.createdAt);
  return { time: mins, statusCd: pre.statusCd };
};

const getLineMsgList = (lineRecords: LineRecord[]): string[] =>
  lineRecords.map(({ message }) => message).reverse();

export const toLineItemData = (lineRecords: LineRecord[]): TLineItemData => {
  if (lineRecords.length < 1) {
    return undefined;
  }
  const lineName = getLineName(lineRecords[0].lineId);
  const lineDes = toLineDes(lineRecords);
  const lineMsgList = getLineMsgList(lineRecords);
  return { lineName, lineDes, lineMsgList };
};

const toNowLineRecords = (lineRecords: LineRecord[]): LineRecord[] => {
  if (lineRecords.length < 1) {
    return [];
  }
  const last = lineRecords[lineRecords.length - 1];
  const nowLast = { ...last, createdAt: nowStr() };
  return [...lineRecords, nowLast];
};

const toLineDes = (lineRecords: LineRecord[]): TLineDesData => {
  const nowLineRecords = toNowLineRecords(lineRecords);
  const { res } = nowLineRecords.reduce((acc, cur) => {
    const { pre, res = [] } = acc;
    return { res: [...res, toPeriod(pre, cur)], pre: cur };
  }, {} as { res: TPeriod[]; pre: LineRecord });
  return res;
};

const realLen = (arr: any[]) =>
  arr.reduce((acc, cur) => {
    if (typeof cur === 'object') {
      return Object.keys(cur).length > 0 ? acc + 1 : acc;
    }
    return acc + 1;
  }, 0);

export const toLineData = (lineRecords: LineRecord[][]) => {
  if (realLen(lineRecords)) {
    return lineRecords.map((lineRecord) => toLineItemData(lineRecord));
  }
  return [];
};
