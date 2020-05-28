import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SIGNITURE } from '../configs/env.conf';
import { serverErrorResponse, unathorizedResponse } from '../responses/responses';

export default async (request: Request, res: Response, next: NextFunction) => {
  try {
    const { headers } = request;

    // Check Authorization Header
    if (!headers.authorization) {
      return unathorizedResponse(res);
    }

    // Validate Authorization Header
    const { authorization } = headers;
    const splittedAuthorization = authorization.split('Bearer');
    if (splittedAuthorization.length <= 1) {
      return unathorizedResponse(res);
    }

    // Verify Token
    const token = splittedAuthorization[1].trim();
    try {
      const decoded = await jwt.verify(token, JWT_SIGNITURE);
      (request as any).user = decoded;
    } catch (error) {
      return unathorizedResponse(res);
    }

    await next();

  } catch (error) {
    return serverErrorResponse(res);
  }
};
