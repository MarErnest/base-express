import 'reflect-metadata';
import { Container } from 'typedi';
import { Database } from './common/components/database/database';
import { App } from './app';
import appLogger from './common/components/logger/app-logger';
import { Seeding } from './common/components/database/seeding/seeding';

const dbContainer = Container.get(Database);
const appContainer = Container.get(App);
const seedContainer = Container.get(Seeding);

(async () => {
  try {
    // Database
    await dbContainer.connect();
    await seedContainer.start();

    // Server
    const appInstance = appContainer.instance;
    const PORT = appInstance.get('PORT');
    await appInstance.listen(PORT);
    appLogger.info(`Server running - ${PORT}`);
  } catch (err) {
    appLogger.error('Server failed', err);
  }
})();
