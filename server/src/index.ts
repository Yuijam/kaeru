import {ApolloServer} from 'apollo-server';
import {PrismaClient} from '@prisma/client';
import resolvers from './resolvers/query';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, '/db/schema.graphql'), 'utf8'),
  resolvers,
  context: {prisma},
});
server.listen().then(({url}) => console.log(`Server is running on ${url}`));
