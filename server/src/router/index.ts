import {Router} from 'express';
export const router = Router();

router.get('/running_data', (req, res) => {
  res.end('running_data ok');
});
