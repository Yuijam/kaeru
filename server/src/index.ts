import {ApolloServer} from 'apollo-server';
import {PrismaClient} from '@prisma/client';
import {resolvers} from './resolvers/query';
import {Resolver, Resolvers, StatusCd} from './generated/graphql';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, '/db/schema.graphql'), 'utf8'),
  resolvers: {
    Query: {
      records: (parent, args, context) => [
        {
          id: '1',
          lineId: 1,
          statusCd: StatusCd.Normal,
          message: 'vvv',
          msgId: 'msgid',
          createdAt: 'crateat',
        },
      ],
    },
  },
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});
server.listen().then(({url}) => console.log(`Server is running on ${url}`));
