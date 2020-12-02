import axios, {AxiosResponse} from 'axios';
// import {methods, recievers} from '../config';
import {TTweet, TParsedTweet} from '../types';
import {TRunningStatus} from 'shared/model';
import {logger} from './logger';

const baseTlUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?';

export const isProduction = () => process.env.KAERU_ENV === 'production';

// export const pushMsg = (msg: string) => {
//   return Promise.all(recievers.map(chatId => axios.post(methods.sendMessage, {chat_id: chatId, text: msg})));
// };

export const toTLApi = (screenName: string) => `${baseTlUrl}screen_name=${screenName}&count=5&include_rts=false`;

export const toTwitterPromise = (api: string): Promise<AxiosResponse<TTweet[]>> =>
  axios.get<TTweet[]>(api, {
    headers: {Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`},
  });

const badWords = ['遅れ', '運休', '人身事故', '見合せ', '運転再開', '所要時間の増加が見込まれます', 'ダイヤが乱れて'];
const goodWords = ['平常'];

const parseTweet = (tweet: TTweet): TRunningStatus => {
  const {text} = tweet;
  const hasBadWord = badWords.some(word => text.includes(word));
  if (hasBadWord) {
    return 'IN_TROUBLE';
  }
  const hasGoodWord = goodWords.some(word => text.includes(word));
  if (hasGoodWord) {
    return 'NORMAL';
  }
  logger.info(`UNKNOWN tweet ${text}`);
  return 'UNKNOWN';
};

export const parseTweets = (tweets: TTweet[]): TParsedTweet[] =>
  tweets.map(tweet => ({
    ...tweet,
    statusCd: parseTweet(tweet),
  }));
