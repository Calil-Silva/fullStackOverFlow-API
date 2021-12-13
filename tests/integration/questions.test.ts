import faker from 'faker';
import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database';
import httpStatus from '../../src/enum/statusCode';
import '../../src/setup';
import { createQuestion } from '../factories/questionsFactory';
import { createUser } from '../factories/usersFactory';
import { mockedNewQuestion } from '../mocks/questions';
import { cleanDataBase, endConnection } from '../utils/database';

const agent = supertest(app);

beforeEach(cleanDataBase);

afterAll(async () => {
  await cleanDataBase();
  await endConnection();
});

describe('POST /questions', () => {
  test('Saves the question and return status code 200 for valid params', async () => {
    const beforeInsert = (await connection.query('SELECT * FROM questions;'))
      .rowCount;
    const result = await agent.post('/questions').send(mockedNewQuestion);
    const afterInsert = (await connection.query('SELECT * FROM questions;'))
      .rowCount;

    expect(result.status).toEqual(200);
    expect(beforeInsert).toBe(0);
    expect(afterInsert).toBe(1);
  });
});

describe('GET /questions/:id', () => {
  beforeEach(async () => {
    await createQuestion();
  });

  afterEach(async () => {
    await cleanDataBase();
  });

  test('Get a question and return status code 200 for valid params', async () => {
    const result = await agent.get('/questions/1');

    expect(result.status).toEqual(httpStatus.OK);
  });
});

describe('POST /questions/:id', () => {
  beforeEach(async () => {
    await createQuestion();
  });

  afterEach(async () => {
    await cleanDataBase();
  });

  test('Should amswer a question and return status code 202 for valid params', async () => {
    const token = await createUser();

    const body = {
      token,
      answer: faker.random.words(5),
    };

    const result = await agent.post('/questions/1').send(body);

    expect(result.status).toEqual(202);
  });
});
