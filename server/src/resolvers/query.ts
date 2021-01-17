import {QueryResolvers} from '../generated/graphql';
import {toDateStr, isValid, startCheckingDateStr} from '../helper';
import {isToday} from 'date-fns';
import {lineConfigs, isCheckingTime} from '../config';
import {getTodayRecords, getTroubleCounts} from '../db/record';
import {LineRecord} from '../generated/graphql';
import {logger, parsetRecordStatus} from '../helper';

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
    if (isToday(queryDate) && !isCheckingTime()) {
      return [];
    }
    const res = await Promise.all(
      lineConfigs.map(async ({id}) => {
        const todayRecords = await getTodayRecords(id, queryDate);
        if (!todayRecords.length) {
          return initRecords(id, new Date(queryDate));
        }
        return todayRecords.map(r => ({...r, createdAt: toDateStr(r.createdAt)}));
      }),
    );
    return res.map(records => parsetRecordStatus(records));
  },
  troubleCounts: async (parent, args) => {
    const {dateStart: dateStartStr, dateEnd: dateEndStr} = args;
    const dateStart = new Date(dateStartStr);
    const dateEnd = new Date(dateEndStr);
    if (!isValid(dateStart) || !isValid(dateEnd)) {
      logger.error(`troubleCounts invalid date ${dateStart}, ${dateEnd}`);
      return [];
    }
    return getTroubleCounts(dateStart, dateEnd);
  },
};
