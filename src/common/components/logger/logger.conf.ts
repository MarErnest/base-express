import { MONGO_DB, isProduction, isTest } from '../../configs/env.conf';
import winston from 'winston';
import 'winston-mongodb';

const mongoDbTransports = (winston.transports as any);

export const getDefaultTransports = (logger: string) => {
  const defaultTransports = [];

  if (!isProduction()) {
    defaultTransports.push(
       // tslint:disable-next-line:no-string-literal
       new mongoDbTransports['MongoDB']({
        db: MONGO_DB,
        collection: `${logger}_logs`,
        capped: false
      })
    );
  }

  if (!isProduction() && !isTest()) {
    defaultTransports.push(
      new winston.transports.Console({
        format: winston.format.prettyPrint()
      })
    );
  }
  return defaultTransports;

};
