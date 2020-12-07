import {QueryResolvers} from '../generated/graphql';
import {toDateStr} from 'shared/lib/dateFns';
import {prisma} from '../db/prisma';
export const Query: QueryResolvers = {
  records: async () => {
    const res = await prisma.record.findMany();
    return res.map(r => ({...r, createdAt: toDateStr(r.createdAt), deletedAt: toDateStr(r.deletedAt)}));
  },
};
