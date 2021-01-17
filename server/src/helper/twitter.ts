import axios, {AxiosResponse} from 'axios';
// import {methods, recievers} from '../config';
import {TTweet, TParsedTweet, TRunningStatus} from './types';
import {logger} from './logger';
import {LineRecord} from '../generated/graphql';

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
const goodWords = ['平常', 'ダイヤ乱れが収束し', '緊急事態宣言発令に伴う一部列車運転取りやめについて'];

export const parsetStatusText = (text: string): TRunningStatus => {
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

const parseTweet = (tweet: TTweet): TRunningStatus => {
  const {text} = tweet;
  return parsetStatusText(text);
};

export const parseTweets = (tweets: TTweet[]): TParsedTweet[] =>
  tweets.map(tweet => ({
    ...tweet,
    statusCd: parseTweet(tweet),
  }));

export const parsetRecordStatus = (records: LineRecord[]): LineRecord[] => {
  return records.reduce((acc, cur) => {
    const curStatus = parsetStatusText(cur.message);
    if (!acc.length) {
      return [{...cur, statusCd: curStatus === 'UNKNOWN' ? 'NORMAL' : curStatus}];
    }
    if (curStatus === 'UNKNOWN') {
      const preStatus = acc[acc.length - 1].statusCd;
      return [...acc, {...cur, statusCd: preStatus}];
    }
    return [...acc, {...cur, statusCd: curStatus}];
  }, [] as LineRecord[]);
};
