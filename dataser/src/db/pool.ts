import mysql, {PoolConnection} from 'mysql';
import {logger, isProduction} from '../helper';

const getDBHost = () => (isProduction() ? 'kaeru_db' : 'localhost');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: getDBHost(),
  user: 'root',
  password: 'root',
  database: 'kaerudb',
});

const release = (connection: PoolConnection) => {
  try {
    connection.release();
  } catch (err) {
    console.log('release connection failed', err);
  }
};

export const query = (sql: string, values?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    logger.info('start get connection');
    pool.getConnection((err, connection) => {
      if (err) {
        reject(`get connection failed ${err}`);
      }
      connection.query(sql, values, (err, results) => {
        release(connection);
        if (err) {
          reject(`exec query failed ${err}`);
        }
        resolve(results);
      });
    });
  });
};

export const end = () => {
  pool.end(err => {
    if (err) {
      console.log('close pool failed ' + err);
    }
  });
};
