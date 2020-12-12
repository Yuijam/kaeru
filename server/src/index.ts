import express from 'express';
import bodyParser from 'body-parser';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import resolvers from './resolvers';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import dataser from './dataser';

const result = dotenv.config({path: path.join(__dirname, '..', '.env')});
if (result.error) {
  throw result.error;
}

// setInterval(() => dataser(), 300000);
setInterval(() => dataser(), 20000);

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, '/db/schema.graphql'), 'utf8'),
  resolvers,
});

const app = express();

app.use(express.static(path.join(__dirname, '..', '/static/kaieru')));
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
