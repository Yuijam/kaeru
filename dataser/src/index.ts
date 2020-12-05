import dotenv from 'dotenv';
import path from 'path';
import parseTwitter from './parser';
import {prisma} from './db/prisma';
import {logger} from './helper';
const result = dotenv.config({path: path.join(__dirname, '..', '.env')});
if (result.error) {
  throw result.error;
}

const main = async () => {
  await parseTwitter();
};

main()
  .then(() => prisma.$disconnect())
  .catch(err => logger.error(`disconnect err ${err}`));
