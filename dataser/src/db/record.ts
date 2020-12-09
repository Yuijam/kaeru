import {RecordCreateInput} from '@prisma/client';
import {prisma} from './prisma';
import {setHours, endOfDay} from 'shared/lib/dateFns';

export const getTodayLatestRecord = async (lineId: number) => {
  const res = await prisma.record.findMany({
    where: {
      lineId: {
        equals: lineId,
      },
      createdAt: {
        gte: setHours(new Date(), 4),
        lte: endOfDay(new Date()),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return res.length ? res[0] : undefined;
};

export const addRecord = async (data: RecordCreateInput) => {
  const res = await prisma.record.create({data});
  return res;
};

export const getRecords = async () => {
  const res = await prisma.record.findMany();
  return res;
};
