import { Service } from 'typedi';
import { Auth } from '../../../../components/auth/auth.entity';
import { Database } from '../database';
import appLogger from '../../logger/app-logger';
import { Role } from '../../../../components/roles/role.entity';
import { SUPPORTED_ROLES } from '../../../../components/roles/role.constants';

interface IStartSeedParams {
  forced: boolean;
}

@Service()
export class AuthSeeding {

  constructor(
    private db: Database
  ) {}

  public start = async (params?: IStartSeedParams) => {
    appLogger.info('Auth Seeding started...');
    const forced = params?.forced || false;
    if (await this.hasSeeded() && !forced) {
      appLogger.info('Auth Seeding was skipped...');
      return;
    }

    const systemAuthRoles = await this.db.sqlManager.find(Role, {
      where: [
        { name: SUPPORTED_ROLES.SYSTEM },
        // { name: SUPPORTED_ROLES.SUPER_ADMIN }
      ]
    });

    const systemAuth = this.db.sqlManager.create(Auth, {
      email: 'markernest.matute@gmail.com'
    });
    systemAuth.setPassword('123456');
    systemAuth.roles = systemAuthRoles;
    await this.db.sqlManager.save(systemAuth);

    appLogger.info('Auth Seeding is done...');
  }

  private hasSeeded = async () => {
    const data = await this.db.sqlManager.count(Auth);
    return data > 0;
  }

}
