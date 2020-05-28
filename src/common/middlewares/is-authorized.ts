import { Request, Response, NextFunction } from 'express';
import { Role } from '../../components/roles/role.entity';
import { unathorizedResponse, serverErrorResponse } from '../../common/responses/responses';

export default (allowedRoles: string[]) => {
  return async (request: Request, res: Response, next: NextFunction) => {
    try {
      const { user: { roles } } = request as any;
      const userRoles = roles.map((role: Role) => role.name);
      const intersection = allowedRoles.filter(role => userRoles.includes(role));
      if (intersection.length === 0) {
        return unathorizedResponse(res);
      }
      await next();
    } catch (error) {
      return serverErrorResponse(res);
    }
  };
};
