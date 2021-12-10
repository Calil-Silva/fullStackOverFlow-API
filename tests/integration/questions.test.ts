import supertest from 'supertest';
import '../../src/setup';
import app from '../../src/app';
import connection from '../../src/database';
import { cleanDataBase, endConnection } from '../utils/database';
import { question } from '../mocks/questions';

const agent = supertest(app);

beforeEach(cleanDataBase);

afterAll(async () => {
  await cleanDataBase();
  await endConnection();
});

describe('POST /questions', () => {
  test('Saves the question and return status code 200 for valid params', async () => {
    const beforeInsert = (await connection.query('SELECT * FROM questions;')).rowCount;
    const result = await agent.post('/questions').send(question);
    const afterInsert = (await connection.query('SELECT * FROM questions;')).rowCount;

    expect(result.status).toEqual(200);
    expect(beforeInsert).toBe(0);
    expect(afterInsert).toBe(1);
  });
});
