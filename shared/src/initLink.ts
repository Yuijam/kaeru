import * as fs from 'fs';
import * as path from 'path';

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  throw '/dist is not exist';
}
const targetProj = ['client', 'server', 'dataser'];

targetProj.map(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}/node_modules/shared`);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
  fs.symlinkSync(distDir, targetPath);
});
