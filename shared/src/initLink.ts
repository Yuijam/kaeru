import * as fs from 'fs';
import * as path from 'path';

const distDir = path.join(__dirname, '..', 'dist');
const prismaDir = path.join(__dirname, '..', 'prisma');
if (!fs.existsSync(distDir) || !fs.existsSync(prismaDir)) {
  throw 'shared/dist or shared/prisma is not exist';
}
const targetProjConfig = ['client', 'server', 'dataser'];
const prismaTargetProjConfig = ['server', 'dataser'];

const targetProj = targetProjConfig.filter(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}/node_modules`);
  return fs.existsSync(targetPath);
});

console.log('targetProj', targetProj);

const prismaTargetProj = prismaTargetProjConfig.filter(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}`);
  return fs.existsSync(targetPath);
});

console.log('prismaTargetProj', prismaTargetProj);

targetProj.map(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}/node_modules/shared`);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
  fs.symlinkSync(distDir, targetPath);
});

prismaTargetProj.map(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}/prisma`);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
  fs.symlinkSync(prismaDir, targetPath);
});
