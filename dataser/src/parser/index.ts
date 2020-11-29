import {LineConfig} from 'shared/config';
import {toTLApi, toTwitterPromise, parseTweets, parsedTweetToDB, recordDBToModel} from '../helper';
import {query, end} from '../db';

const getNewestRecord = async (lineId: number) => {
  const sql = `select * from record order by created_at desc limit 1;`;
  const res = await query(sql);
  return res[0];
};

export default () =>
  LineConfig.map(async cfg => {
    const tlApi = toTLApi(cfg.screenName);
    const {data} = await toTwitterPromise(tlApi);
    const tweets = data.map(({text, created_at, id_str}) => ({created_at, text, id_str}));
    const parsedRes = parseTweets(tweets);
    // const dbData = parsedTweetToDB(parsedRes[0], cfg.id);
    // console.log('parsedRes', dbData);
    // const res = await query(`insert into record set ?`, dbData);
    // const rr = await query('select * from record');
    const newestRecord = await getNewestRecord(cfg.id);
    // const model = recordDBToModel(res);
    // console.log('res', model);
    end();
  });
