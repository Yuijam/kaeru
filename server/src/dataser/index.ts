import parseTwitter from './parser';
import {prisma} from '../db/prisma';
import {logger} from '../helper';

const main = async () => {
  await parseTwitter()
    .then(() => prisma.$disconnect())
    .catch(err => logger.error(`disconnect err ${err}`));
};

export default main;
