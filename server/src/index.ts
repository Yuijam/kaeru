import express from 'express';
import * as path from 'path';
import {initdb} from './db';
import {BASE_API_URL} from './config';
import {router} from './router';
initdb();

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use(BASE_API_URL, router);
app.listen(3000, () => {
  console.log('listening 3000');
});
