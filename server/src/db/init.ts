import {query} from './pool';

const createDatabase = () => query('CREATE DATABASE IF NOT EXISTS kaerudb');
const createTableLine = () =>
  query(
    'CREATE TABLE IF NOT EXISTS line (\
      id SMALLINT AUTO_INCREMENT PRIMARY KEY,\
      name VARCHAR(100),\
      data_src VARCHAR(100),\
      created_at DATE,\
      delete_at DATE\
    )',
  );

const createTableRecord = () =>
  query(
    'CREATE TABLE IF NOT EXISTS record (\
      id SMALLINT AUTO_INCREMENT PRIMARY KEY,\
      line_id SMALLINT,\
      status_cd TINYINT,\
      message VARCHAR(500),\
      created_at DATE,\
      delete_at DATE\
    )',
  );

export const initdb = async () => {
  // await createDatabase();
  await createTableLine();
  await createTableRecord();
};
