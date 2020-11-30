import {TPartialEntity} from '../helper';

export type TRunningStatus = 'IN_TROUBLE' | 'NORMAL';

export type TRecord = {
  id: number;
  lineId: number;
  statusCd: TRunningStatus;
  message: string;
  createdAt: string;
  deletedAt: string;
};

export type TRecordDB = {
  id: number;
  line_id: number;
  status_cd: TRunningStatus;
  message: string;
  created_at: string;
  deleted_at: string;
};

export type TPartialRecord = TPartialEntity<TRecordDB>;
