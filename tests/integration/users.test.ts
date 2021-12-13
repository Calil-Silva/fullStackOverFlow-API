import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database';
import { invalidUser, user } from '../mocks/user';
// import * as usersService from '../../src/services/usersService';
// import * as usersController from '../../src/controllers';
import { cleanDataBase, endConnection } from '../utils/database';

const agent = supertest(app);

beforeEach(cleanDataBase);

afterAll(async () => {
  await cleanDataBase();
  await endConnection();
});

describe('POST /users', () => {
  test('Should return status code 400 if users credentials are invalid', async () => {
    const beforeInsert = (await connection.query('SELECT * FROM users;'))
      .rowCount;
    const result = await agent.post('/users').send(invalidUser);
    const afterInsert = (await connection.query('SELECT * FROM users;'))
      .rowCount;

    expect(beforeInsert).toBe(0);
    expect(result.status).toEqual(400);
    expect(afterInsert).toBe(0);
  });

  test('Shoudl return status code 201 if credentials are valid', async () => {
    const beforeInsert = (await connection.query('SELECT * FROM users;'))
      .rowCount;
    const result = await agent.post('/users').send(user);
    const afterInsert = (await connection.query('SELECT * FROM users;'))
      .rowCount;

    expect(beforeInsert).toBe(0);
    expect(result.status).toEqual(201);
    expect(afterInsert).toBe(1);
  });
});
