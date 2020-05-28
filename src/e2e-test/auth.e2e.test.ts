import { startServer, stopServer } from './test.conf';
import supertest from 'supertest';

describe('Auth e2e', () => {

  let server: supertest.SuperTest<supertest.Test>;
  let token: string = '';

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it('It should login system user', async () => {
    const { body: { data }, status } = await server.post('/auth/login').send({
      email: 'markernest.matute@gmail.com',
      password: '123456'
    });
    expect(status).toBe(200);
    expect(data).toHaveProperty('token');
    token = data.token;
  });

  it('It should get system user session', async () => {
    const { status } = await server.get('/auth/get-current-session').set({
      'Authorization': `Bearer ${token}`
    });
    expect(status).toBe(200);
  });

  it('It should access for-system-user api', async () => {
    const { status } = await server.get('/auth/for-system-user').set({
      'Authorization': `Bearer ${token}`
    });
    expect(status).toBe(200);
  });

  it('It should not access for-super-admin-user api', async () => {
    const { status } = await server.get('/auth/for-super-admin-user').set({
      'Authorization': `Bearer ${token}`
    });
    expect(status).toBe(401);
  });

  it('It should not login system user with wrong credentials', async () => {
    const { status } = await server.post('/auth/login').send({
      email: 'markernest.matute@gmail.com',
      password: '1234566' // INCORRECT PASSWORD
    });
    expect(status).toBe(401);
  });

  it('It should not get session with invalid token', async () => {
    const { status } = await server.get('/auth/get-current-session').set({
      'Authorization': `Bearer invalid-token`
    });
    expect(status).toBe(401);
  });

});
