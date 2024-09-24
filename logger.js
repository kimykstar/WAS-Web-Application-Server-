const winston = require("winston");

const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(timestamp({ format: "YYYY-MM-dd HH:mm:ss:SSS" }), logFormat),
  level: "http",
  transports: [new winston.transports.Console()],
});

module.exports = { logger };
