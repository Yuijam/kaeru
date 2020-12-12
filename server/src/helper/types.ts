export type TTweet = {
  id_str: string;
  created_at: string;
  text: string;
};

export type TParsedTweet = TTweet & {
  statusCd: TRunningStatus;
};

export type TRunningStatus = 'IN_TROUBLE' | 'NORMAL' | 'UNKNOWN';
