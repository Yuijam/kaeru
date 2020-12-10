import {QueryResolvers} from '../generated/graphql';
import {toDateStr, isValid} from 'shared/lib/dateFns';
import {lineConfigs} from 'shared/config';
import {getTodayRecords} from '../db/record';

export const Query: QueryResolvers = {
  lineRecords: async (parent, args) => {
    if (args.date && !isValid(new Date(args.date))) {
      return [];
    }
    const queryDate = args.date ? new Date(args.date) : new Date();
    const res = await Promise.all(
      lineConfigs.map(async ({id}) => {
        const todayRecords = await getTodayRecords(id, queryDate);
        return todayRecords.map(r => ({...r, createdAt: toDateStr(r.createdAt)}));
      }),
    );
    return res;
  },
};
