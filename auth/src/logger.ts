import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  format: combine(label({ label: "auth" }), timestamp(), myFormat),
  defaultMeta: { service: "auth" },
  transports: [new transports.Console()],
});