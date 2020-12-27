import {QueryResolvers} from '../generated/graphql';
import {toDateStr, isValid, startCheckingDateStr} from '../helper';
import {isToday} from 'date-fns';
import {lineConfigs, isCheckingTime} from '../config';
import {getTodayRecords} from '../db/record';
import {LineRecord} from '../generated/graphql';

const initRecords = (() => {
  let tempId = -1;
  return (lineId: number, date: Date): LineRecord[] => [
    {id: tempId--, msgId: '', lineId, statusCd: 'NORMAL', createdAt: startCheckingDateStr(date), message: 'running ok'},
  ];
})();

export const Query: QueryResolvers = {
  lineRecords: async (parent, args) => {
    if (args.date && !isValid(new Date(args.date))) {
      return [];
    }
    const queryDate = args.date ? new Date(args.date) : new Date();
    const res = await Promise.all(
      lineConfigs.map(async ({id}) => {
        const todayRecords = await getTodayRecords(id, queryDate);
        if (!todayRecords.length && (!isToday(queryDate) || isCheckingTime())) {
          return initRecords(id, new Date(queryDate));
        }
        return todayRecords.map(r => ({...r, createdAt: toDateStr(r.createdAt)}));
      }),
    );
    return res;
  },
};
