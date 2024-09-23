const winston = require("winston");

const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(timestamp({ format: "YYYYMMDD" }), logFormat),
  level: "http",
  transports: [new winston.transports.Console()],
});

module.exports = { logger };
