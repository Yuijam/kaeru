import {RecordCreateInput} from '@prisma/client';
import {prisma} from './prisma';
import {setHours, endOfDay} from '../helper';
import {startHour} from '../config';

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

export const addRecord = async (data: RecordCreateInput) => {
  const res = await prisma.record.create({data});
  return res;
};

export const getRecords = async () => {
  const res = await prisma.record.findMany();
  return res;
};
