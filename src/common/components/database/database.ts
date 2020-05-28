import { Connection, createConnection, EntityManager, getManager } from 'typeorm';
import { Service } from 'typedi';
import { isProduction } from '../../configs/env.conf';
import appLogger from '../logger/app-logger';

@Service()
export class Database {

  private connection!: Connection;
  public sqlManager: EntityManager;

  public getConnection = async () => {
    await this.connect();
    return this.connection;
  }

  public connect = async () => {
    try {
      if (!this.connection) {
        // This will get config on ormconfig.js
        this.connection = await createConnection();
        this.sqlManager = await getManager();
      }
      appLogger.info('Connected to MySQL Database...');
    } catch (error) {
      appLogger.error('Connection to MySQL Database failed...', error);
      throw error;
    }
  }

  public disconnect = async () => {
    if (this.connection.isConnected) {
      try {
        this.connection.close();
      } catch (error) {
        throw error;
      }
    }
  }

  public reset = async () => {
    try {
      if (isProduction()) {
        return;
      }
      for (const meta of this.connection.entityMetadatas) {
        await this.connection.manager.delete(meta.name, {});
      }
    } catch (error) {
      throw error;
    }
  }

}
