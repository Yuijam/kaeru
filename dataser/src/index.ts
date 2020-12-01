import dotenv from 'dotenv';
import path from 'path';
import parseTwitter from './parser';
import {end} from './db/pool';
import http from 'http';

const result = dotenv.config({path: path.join(__dirname, '..', '.env')});
if (result.error) {
  throw result.error;
}

const main = async () => {
  await parseTwitter();
  // end();
};

const interval = 5 * 60 * 1000;
setInterval(() => main(), interval);

const healthyCheckSer = http.createServer((req, res) => {
  res.end('dataser is ok');
});

healthyCheckSer.listen('3300', () => {
  console.log('healthyCheckSer is listen on 3300...');
});
