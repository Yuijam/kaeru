import express from 'express';
import bodyParser from 'body-parser';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import resolvers from './resolvers';
import fs from 'fs';
import path from 'path';

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, '/db/schema.graphql'), 'utf8'),
  resolvers,
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
