import {prisma} from '../db/prisma';
export type Context = {db: typeof prisma};
