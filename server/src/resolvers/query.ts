import {QueryResolvers, Resolvers} from '../generated/graphql';
import {prisma} from '../db/prisma';
export const query: QueryResolvers = {
  records: async (parent: any, args: any, context: any) => {
    const res = await prisma.record.findMany();
    console.log(res);
    const newres = res.map((r: any) => ({...r, createdAt: '2222', deletedAt: 'aaa'}));
    return newres;
  },
};

export default {
  Query: query,
};
