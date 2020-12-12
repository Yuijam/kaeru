import {TParsedTweet} from './types';
import {RecordCreateInput} from '@prisma/client';

export const parsedTweetToDB = (tweet: TParsedTweet, lineId: number): RecordCreateInput => ({
  msgId: tweet.id_str,
  lineId: lineId,
  statusCd: tweet.statusCd,
  message: tweet.text,
});
