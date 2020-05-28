import { Service } from 'typedi';
import { Auth } from './auth.entity';
import { BaseService } from '../../core/base-service';
import { ILoginParams } from './dtos/login.dto';
import { validate } from 'class-validator';
import { IResponse } from '../../common/dtos/response.dto';
import loginError from './errors/login.error';

@Service()
export class AuthService extends BaseService {

  public getAuth =  async (): Promise<Auth[]> => {
    try {
      const auth = await this.database.sqlManager.find(Auth);
      return auth;
    } catch (error) {
      throw error;
    }
  }

  public saveAuth = async (): Promise<Auth> => {
    try {
      const auth = await this.database.sqlManager.transaction(async transactionEntityManager => {
        const newAuth = new Auth();
        newAuth.email = 'markernest.matute@gmail.com';
        newAuth.setPassword('1234567');
        await transactionEntityManager.save(newAuth);
        return newAuth;
      });
      return auth;
    } catch (error) {
      throw error;
    }
  }

  public login = async (params: ILoginParams): Promise<IResponse> => {
    try {
      // Validation
      const errors = await validate(params);
      if (errors && errors.length > 0) {
        return {
          validationErrors: errors,
          status: false
        };
      }

      // Spread params
      const { email, password } = params;

      // Check if email exists
      const auth = await this.database.sqlManager.findOne(Auth, {
        where: {
          email
        },
        relations: ['roles']
      });
      if (!auth || (auth && !auth.checkPassword(password))) {
        return {
          validationErrors: [ loginError ],
          status: false
        };
      }

      return {
        data: {
          token:  await auth.toJWT()
        },
        status: true
      };

    } catch (error) {
      throw error;
    }
  }

}
