import mysql, {PoolConnection} from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',
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
  return new Promise(resolve => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw 'get connection failed' + err;
      }
      connection.query(sql, values, (err, results) => {
        release(connection);
        if (err) {
          throw err;
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
