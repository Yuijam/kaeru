import {TRunningStatus} from 'shared/model';

export type TTweet = {
  id_str: string;
  created_at: string;
  text: string;
};

export type TParsedTweet = TTweet & {
  status: TRunningStatus;
};
