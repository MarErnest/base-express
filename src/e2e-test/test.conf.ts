import { Container } from 'typedi';
import { Database } from '../common/components/database/database';
import { Seeding } from '../common/components/database/seeding/seeding';
import { App } from '../app';
import supertest from 'supertest';

const db = Container.get(Database);
const seeding = Container.get(Seeding);
const app = Container.get(App);

export const startServer = async () => {
  await db.connect();
  await seeding.start({ forced: true });
  const server = supertest(app.instance);
  return server;
};

export const stopServer = async () => {
  await db.disconnect();
};
