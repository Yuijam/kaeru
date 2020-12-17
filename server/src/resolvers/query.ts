import {QueryResolvers} from '../generated/graphql';
import {toDateStr, isValid, startChecingDateStr} from '../helper';
import {lineConfigs} from '../config';
import {getTodayRecords} from '../db/record';
import {LineRecord} from '../generated/graphql';

const initRecords = (lineId: number): LineRecord[] => [
  {id: -1, msgId: '', lineId, statusCd: 'NORMAL', createdAt: startChecingDateStr(), message: 'running ok'},
];

export const Query: QueryResolvers = {
  lineRecords: async (parent, args) => {
    if (args.date && !isValid(new Date(args.date))) {
      return [];
    }
    const queryDate = args.date ? new Date(args.date) : new Date();
    const res = await Promise.all(
      lineConfigs.map(async ({id}) => {
        const todayRecords = await getTodayRecords(id, queryDate);
        if (!todayRecords.length) {
          return initRecords(id);
        }
        return todayRecords.map(r => ({...r, createdAt: toDateStr(r.createdAt)}));
      }),
    );
    return res;
  },
};
