import {RecordCreateInput} from '@prisma/client';
import {prisma} from './prisma';

export const getLatestRecord = async (lineId: number) => {
  const res = await prisma.record.findMany({
    where: {
      lineId: {
        equals: lineId,
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
