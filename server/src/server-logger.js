import winston from 'winston';

function createLogger(serviceName) {
  const logger = winston.createLogger({
    level: 'debug',
    // Note that the order matters here!
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new winston.transports.File({ filename: 'kennis.log' })
    ]
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }));
  }

  return logger;
}

export const serverLogger = createLogger('server-logger')
