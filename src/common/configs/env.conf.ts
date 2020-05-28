import dotenv from 'dotenv';
import { ENV as envConstants } from '../constants/constants';

dotenv.config();

/**
 * Port where the
 * application will run
 */
export const PORT = process.env.PORT || 3000;

/**
 * ENV where the
 * application is running
 */
export const ENV = process.env.ENV || envConstants.DEVELOP;
export const isLocal = () => ENV === envConstants.LOCAL;
export const isDevelop = () => ENV === envConstants.DEVELOP;
export const isTest = () => ENV === envConstants.TEST;
export const isProduction = () => ENV === envConstants.PRODUCTION;


/**
 * Rate Limiter Configs
 */
export const RATE_LIMITER = {
    POINTS_TO_CONSUME: process.env.RATE_POINTS_TO_CONSUME || 1,
    MAX_POINTS: process.env.RATE_MAX_POINTS || 5,
    BLOCKAGE_SECONDS: process.env.RATE_BLOCKAGE_SECONDS || 2
};

/**
 * MongoDB
 */
export const MONGO_DB = process.env.MONGO_DB;

/**
 * JWT Signiture
 */
export const JWT_SIGNITURE = process.env.JWT_SIGNITURE || '12345';
