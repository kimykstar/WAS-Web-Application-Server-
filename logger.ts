import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  format: combine(timestamp({ format: "YYYY-MM-dd HH:mm:ss:SSS" }), logFormat),
  level: "http",
  transports: [new winston.transports.Console()],
});
