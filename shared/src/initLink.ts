import * as fs from 'fs';
import * as path from 'path';

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  throw '/dist is not exist';
}
const targetProjConfig = ['client', 'server', 'dataser'];

const targetProj = targetProjConfig.filter(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}/node_modules`);
  return fs.existsSync(targetPath);
});

console.log('targetProj', targetProj);

targetProj.map(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}/node_modules/shared`);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
  fs.symlinkSync(distDir, targetPath);
});
