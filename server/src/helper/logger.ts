import {createLogger, format} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const {combine, timestamp, prettyPrint} = format;

// transport.on('rotate', function (oldFilename, newFilename) {
//   // do something fun
// });

export const logger = createLogger({
  format: combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), prettyPrint()),
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
