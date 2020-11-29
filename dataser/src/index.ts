import dotenv from 'dotenv';
import path from 'path';
import parseTwitter from './parser';

const result = dotenv.config({path: path.join(__dirname, '..', '.env')});
if (result.error) {
  throw result.error;
}

parseTwitter();
