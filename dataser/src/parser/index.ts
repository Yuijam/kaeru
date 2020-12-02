import {lineConfigs, TLineConfig} from 'shared/config';
import {toTLApi, toTwitterPromise, parseTweets, parsedTweetToDB, logger} from '../helper';
import {addRecord, getLatestRecord} from '../db/record';

type TFetchRes = {
  res: 'OK' | 'FAILED';
  msg: string;
};

const fetchData = async (cfg: TLineConfig): Promise<TFetchRes> => {
  try {
    const tlApi = toTLApi(cfg.screenName);
    logger.info(`fetch api ${cfg.name}`);
    const {data} = await toTwitterPromise(tlApi);
    logger.info(`fetch api ok ${cfg.name}`);
    const tweets = data.map(({text, created_at, id_str}) => ({created_at, text, id_str}));
    const parsedRes = parseTweets(tweets);
    const latestData = parsedRes[0];
    const latestRecord = await getLatestRecord(cfg.id);
    logger.info(`compare ${latestData.statusCd}, ${latestRecord?.statusCd}`);
    if (!latestRecord || latestData.statusCd === 'IN_TROUBLE' || latestRecord.statusCd === 'IN_TROUBLE') {
      logger.info('add record');
      await addRecord(parsedTweetToDB(latestData, cfg.id));
    }
    logger.info(`parse ${cfg.name} ok`);
    return {res: 'OK', msg: ''};
  } catch (err) {
    logger.error(`parse ${cfg.name} Error! ${err}`);
    return {res: 'FAILED', msg: cfg.name};
  }
};

export default async () => {
  const promises = lineConfigs.map(cfg => fetchData(cfg));
  const results = await Promise.all(promises);
  const failedResults = results.filter(({res}) => res === 'FAILED');
  if (failedResults.length) {
    const names = failedResults.map(({msg}) => msg);
    logger.info(`failed ${failedResults.length}, ${names}`);
    return;
  }
  logger.info(`parse all ok`);
};
