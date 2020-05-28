import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import { RATE_LIMITER } from '../configs/env.conf';
import { tooManyRequestResponse } from '../responses/responses';

const rateLimiter = new RateLimiterMemory({
  points: +RATE_LIMITER.MAX_POINTS,
  duration: +RATE_LIMITER.BLOCKAGE_SECONDS,
});

export default(request: Request, res: Response, next: NextFunction) => {
  rateLimiter.consume(request.ip, +RATE_LIMITER.POINTS_TO_CONSUME)
    .then(() => next())
    .catch((error) => {
      return tooManyRequestResponse(res);
    });
};
