import {LineConfig} from 'shared/config';
import {toTLApi, toTwitterPromise, parseTweets, parsedTweetToDB} from '../helper';
import {addRecord, getLatestRecord} from '../db/record';

export default async () =>
  LineConfig.map(async cfg => {
    const tlApi = toTLApi(cfg.screenName);
    const {data} = await toTwitterPromise(tlApi);
    const tweets = data.map(({text, created_at, id_str}) => ({created_at, text, id_str}));
    const parsedRes = parseTweets(tweets);
    const latestData = parsedRes[0];
    const latestRecord = await getLatestRecord(cfg.id);
    if (!latestRecord || latestData.statusCd === 'IN_TROUBLE' || latestRecord.statusCd === 'IN_TROUBLE') {
      await addRecord(parsedTweetToDB(latestData, cfg.id));
    }
  });
