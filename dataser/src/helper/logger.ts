import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// transport.on('rotate', function (oldFilename, newFilename) {
//   // do something fun
// });

export const logger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: 'log',
      zippedArchive: true,
      maxSize: '1m',
      maxFiles: '14d',
    }),
  ],
});
