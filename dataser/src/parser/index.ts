import {lineConfigs} from 'shared/config';
import {toTLApi, toTwitterPromise, parseTweets, parsedTweetToDB, logger} from '../helper';
import {addRecord, getLatestRecord} from '../db/record';

export default async () => {
  const promises = lineConfigs.map(async cfg => {
    try {
      const tlApi = toTLApi(cfg.screenName);
      logger.info(`fetch api ${cfg.name}`);
      const {data} = await toTwitterPromise(tlApi);
      logger.info(`fetch api ok ${cfg.name}`);
      const tweets = data.map(({text, created_at, id_str}) => ({created_at, text, id_str}));
      const parsedRes = parseTweets(tweets);
      const latestData = parsedRes[0];
      const latestRecord = await getLatestRecord(cfg.id);
      logger.info('compare', latestData, latestRecord);
      if (!latestRecord || latestData.statusCd === 'IN_TROUBLE' || latestRecord.statusCd === 'IN_TROUBLE') {
        logger.info('add record');
        await addRecord(parsedTweetToDB(latestData, cfg.id));
      }
      logger.info(`parse ${cfg.screenName} ok`);
      return 'ok';
    } catch (err) {
      logger.error(`parse ${cfg.screenName} Error! ${err}`);
    }
  });
  await Promise.all(promises);
};
