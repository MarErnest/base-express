import expressWinston from 'express-winston';
import { getDefaultTransports } from '../components/logger/logger.conf';

export default expressWinston.logger({
    transports: getDefaultTransports('api'),
    requestWhitelist: [...expressWinston.requestWhitelist, 'body', 'headers', 'query'],
    responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
  });
