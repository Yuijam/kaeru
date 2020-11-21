import express from 'express';
import * as path from 'path';
const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.listen(3000, () => {
  console.log('listening 3000');
});
