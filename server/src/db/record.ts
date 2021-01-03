import {RecordCreateInput} from '@prisma/client';
import {prisma} from './prisma';
import {setHours, endOfDay} from '../helper';
import {startHour, lineIds, getLineName} from '../config';
import {TroubleCount} from '../generated/graphql';
import {isSameDay} from 'date-fns';

export const getTodayLatestRecord = async (lineId: number) => {
  const res = await getTodayRecords(lineId, new Date());
  return res.length ? res[res.length - 1] : undefined;
};

export const getTodayRecords = async (lineId: number, date: Date) => {
  const res = await prisma.record.findMany({
    where: {
      lineId: {
        equals: lineId,
      },
      createdAt: {
        gte: setHours(date, startHour),
        lte: endOfDay(date),
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return res;
};

export const getTroubleCounts = async (dateStart: Date, dateEnd: Date) => {
  const records = await prisma.record.findMany({
    where: {
      createdAt: {
        gte: dateStart,
        lte: dateEnd,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const res = lineIds.map(id => {
    let preDate: Date;
    return records
      .filter(({lineId, statusCd}) => lineId === id && statusCd === 'IN_TROUBLE')
      .reduce(
        (acc, cur) => {
          if (!preDate) {
            preDate = new Date(cur.createdAt);
            return {...acc, count: ++acc.count};
          }
          if (!isSameDay(preDate, new Date(cur.createdAt))) {
            preDate = new Date(cur.createdAt);
            return {...acc, count: ++acc.count};
          }
          return acc;
        },
        {lineName: getLineName(id), count: 0} as TroubleCount,
      );
  });
  return res;
};

export const addRecord = async (data: RecordCreateInput) => {
  const res = await prisma.record.create({data});
  return res;
};

export const getRecords = async () => {
  const res = await prisma.record.findMany();
  return res;
};
