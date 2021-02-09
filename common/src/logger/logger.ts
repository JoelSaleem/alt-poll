import {
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const createLogger = (service: string) =>
  createWinstonLogger({
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    },
    format: combine(label({ label: service }), timestamp(), myFormat),
    defaultMeta: { service },
    transports: [new transports.Console()],
  });
