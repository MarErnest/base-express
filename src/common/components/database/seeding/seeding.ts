import { Service } from 'typedi';
import { Database } from '../database';
import appLogger from '../../logger/app-logger';
import { AuthSeeding } from './auth.seeding';
import { RoleSeeding } from './role.seeding';

interface IStartSeedParams {
  forced: boolean;
}

@Service()
export class Seeding {

  constructor(
    private db: Database,
    private roleSeeding: RoleSeeding,
    private authSeeding: AuthSeeding,
  ) {}

  public start = async (params?: IStartSeedParams) => {
    appLogger.info('Seeding started...');
    const forced = params?.forced || false;
    await this.db.reset();
    await this.roleSeeding.start({ forced });
    await this.authSeeding.start({ forced });
    appLogger.info('Seeding is done...');
  }

}
