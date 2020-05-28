import { startServer, stopServer } from './test.conf';
import supertest from 'supertest';

describe('App e2e', () => {

  let server: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it('should run', async () => {
    const { body } = await server.get('/test');
    expect(body).toHaveProperty('great');
  });

});
