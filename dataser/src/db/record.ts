import {query} from './pool';
import {recordDBToModel} from '../helper';
import {TPartialRecord} from 'shared/model';

export const getLatestRecord = async (lineId: number) => {
  const res = await query(`select * from record where line_id=${lineId} order by created_at desc limit 1`);
  return res[0] ? recordDBToModel(res[0]) : undefined;
};

export const addRecord = (data: TPartialRecord) => query('insert into record set ?', data);

export const getRecords = () => query('select * from record');
