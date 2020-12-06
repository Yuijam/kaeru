import * as fs from 'fs';
import * as path from 'path';
import {exec} from 'child_process';

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  throw '/dist is not exist';
}
const prismaDir = path.join(__dirname, '..', '..', 'dataser/prisma');
if (!fs.existsSync(prismaDir)) {
  throw 'prisma dir is not exist';
}

const targetProjConfig = ['client', 'server', 'dataser'];
const targetPrismaConfig = ['server'];

const targetProj = targetProjConfig.filter(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}/node_modules`);
  return fs.existsSync(targetPath);
});

const targetPrismaProj = targetPrismaConfig.filter(proj => {
  const targetPath = path.join(__dirname, '..', '..', proj);
  return fs.existsSync(targetPath);
});

console.log('targetProj', targetProj);

// sync shared file
targetProj.map(proj => {
  const targetPath = path.join(__dirname, '..', '..', `${proj}/node_modules/shared`);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
  fs.symlinkSync(distDir, targetPath);
});

// sync prisma model
targetPrismaProj.map(proj => {
  const targetPrismaPath = path.join(__dirname, '..', '..', `${proj}/prisma`);
  if (fs.existsSync(targetPrismaPath)) {
    fs.unlinkSync(targetPrismaPath);
  }
  exec(`cp -r ${prismaDir} ${targetPrismaPath}`, err => {
    if (err) {
      console.log(`cp -r ${prismaDir} ${targetPrismaPath} failed! ${err}`);
    } else {
      console.log(`copy prisma to ${targetPrismaPath} ok!`);
    }
  });
});
