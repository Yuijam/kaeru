export type TRunningStatus = 'IN_TROUBLE' | 'NORMAL' | 'UNKNOWN';

export type TRecord = {
  id: number;
  lineId: number;
  statusCd: TRunningStatus;
  message: string;
  createdAt: string;
  deletedAt: string;
};
