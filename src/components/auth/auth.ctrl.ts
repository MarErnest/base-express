import { BaseController, IBaseController } from '../../core/base-ctrl';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Container } from 'typedi';
import { plainToClass } from 'class-transformer';
import { ILoginParams } from './dtos/login.dto';
import isAuthenticated from '../../common/middlewares/is-authenticated';
import isAuthorized from '../../common/middlewares/is-authorized';
import { SUPPORTED_ROLES } from '../roles/role.constants';
import { unathorizedResponse } from '../../common/responses/responses';

export class AuthController extends BaseController implements IBaseController {

  private authService: AuthService;

  constructor() {
    super();
    this.authService = Container.get(AuthService);
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.router.post('/auth/login', this.login);
    this.router.get('/auth/get-current-session', isAuthenticated, this.getSession);
    this.router.get('/auth/for-system-user', isAuthenticated, isAuthorized([SUPPORTED_ROLES.SYSTEM]), this.forSystemUser);
    this.router.get('/auth/for-super-admin-user', isAuthenticated, isAuthorized([SUPPORTED_ROLES.SUPER_ADMIN]), this.forSuperAdminUser);
  }

  private login = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const params = await plainToClass(ILoginParams, body);
      const response = await this.authService.login(params);

      if (!response.status) {
        return unathorizedResponse(res);
      }

      res.json(response);
    } catch (error) {
      this.serverError(res, { meta: error });
    }
  }

  private getSession = async (req: Request, res: Response) => {
    try {
      res.json({ user: (req as any).user});
    } catch (error) {
      this.serverError(res, { meta: error });
    }
  }

  private forSystemUser = async (req: Request, res: Response) => {
    try {
      res.json({ user: (req as any).user});
    } catch (error) {
      this.serverError(res, { meta: error });
    }
  }

  private forSuperAdminUser = async (req: Request, res: Response) => {
    try {
      res.json({ user: (req as any).user});
    } catch (error) {
      this.serverError(res, { meta: error });
    }
  }
}

export default new AuthController();
