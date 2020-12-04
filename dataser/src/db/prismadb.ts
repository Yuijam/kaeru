import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  const allRecords = await prisma.record.findMany();
};
