import appLogger from '../common/components/logger/app-logger';
import express, { Router, Response } from 'express';
import winston from 'winston';
import { serverErrorResponse } from '../common/responses/responses';

export interface IBaseController {
  registerRoutes(): void;
}

export class BaseController {

  public appLogger: winston.Logger;
  public router: express.Router;

  constructor() {
    this.appLogger = appLogger;
    this.router = Router();
  }

  public serverError = (res: Response, error: any) => {
    this.appLogger.error('Server Error', error);
    return serverErrorResponse(res);
  }

}
