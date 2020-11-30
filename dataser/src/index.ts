import dotenv from 'dotenv';
import path from 'path';
import parseTwitter from './parser';
import {end} from './db/pool';

const result = dotenv.config({path: path.join(__dirname, '..', '.env')});
if (result.error) {
  throw result.error;
}

const main = async () => {
  await parseTwitter();
  end();
};

main();
