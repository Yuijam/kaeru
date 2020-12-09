import {RecordCreateInput} from '@prisma/client';
import {prisma} from './prisma';
import {setHours, endOfDay} from 'shared/lib/dateFns';
import {startHour} from 'shared/config';

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
