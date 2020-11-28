import express from 'express';
import * as path from 'path';
import {initdb} from './db';
initdb();

const app = express();

app.get('/health', (req, res) => {
  res.status(200);
  res.send('ok');
});

app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.listen(5000, () => {
  console.log('listening 5000');
});
