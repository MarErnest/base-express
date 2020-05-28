import { getDefaultTransports } from './logger.conf';
import winston from 'winston';

export default winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: getDefaultTransports('app'),
});
