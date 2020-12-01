import winston from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');

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
      maxSize: '5k',
      maxFiles: '14d',
    }),
  ],
});
