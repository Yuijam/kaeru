import * as fs from 'fs';
import * as path from 'path';

if (!fs.existsSync('./dist')) {
  throw '/dist is not exist';
}
const targetProj = ['client', 'server'];

targetProj.map(proj => {
  const targetPath = path.join(__dirname, '..', `${proj}/node_modules/shared`);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
  fs.symlinkSync(path.join(__dirname, 'dist'), targetPath);
});
