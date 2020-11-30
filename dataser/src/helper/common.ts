import axios, {AxiosResponse} from 'axios';
// import {methods, recievers} from '../config';
import {TTweet, TParsedTweet} from '../types';
import {TRunningStatus} from 'shared/model';
const baseTlUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?';

// export const pushMsg = (msg: string) => {
//   return Promise.all(recievers.map(chatId => axios.post(methods.sendMessage, {chat_id: chatId, text: msg})));
// };

export const toTLApi = (screenName: string) => `${baseTlUrl}screen_name=${screenName}&count=5&include_rts=false`;

export const toTwitterPromise = (api: string): Promise<AxiosResponse<TTweet[]>> =>
  axios.get<TTweet[]>(api, {
    headers: {Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`},
  });

const badWords = ['遅れ', '運休', '人身事故', '見合せ'];

const parseTweet = (tweet: TTweet): TRunningStatus => {
  const {text} = tweet;
  const hasBadWord = badWords.some(word => text.includes(word));
  return hasBadWord ? 'IN_TROUBLE' : 'NORMAL';
};

export const parseTweets = (tweets: TTweet[]): TParsedTweet[] =>
  tweets.map(tweet => ({
    ...tweet,
    statusCd: parseTweet(tweet),
  }));
