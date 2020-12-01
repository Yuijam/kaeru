import {lineConfigs} from 'shared/config';
import {toTLApi, toTwitterPromise, parseTweets, parsedTweetToDB, logger} from '../helper';
import {addRecord, getLatestRecord, getRecords} from '../db/record';

export default async () => {
  const promises = lineConfigs.map(async cfg => {
    try {
      const tlApi = toTLApi(cfg.screenName);
      const {data} = await toTwitterPromise(tlApi);
      const tweets = data.map(({text, created_at, id_str}) => ({created_at, text, id_str}));
      const parsedRes = parseTweets(tweets);
      const latestData = parsedRes[0];
      const latestRecord = await getLatestRecord(cfg.id);
      if (!latestRecord || latestData.statusCd === 'IN_TROUBLE' || latestRecord.statusCd === 'IN_TROUBLE') {
        await addRecord(parsedTweetToDB(latestData, cfg.id));
      }
      logger.info(`parse ${cfg.screenName} ok`);
      return 'ok';
    } catch (err) {
      logger.error(`parse ${cfg.screenName} Error! ${err}`);
    }
  });
  await Promise.all(promises);
  const res = await getRecords();
  console.log(res);
};
