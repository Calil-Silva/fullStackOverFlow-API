import * as questionsService from '../../src/services/questionsService';
import QuestionCreationError from '../../src/errors/QuestionCreationError';
import {
  mockedNewQuestion, mockedUnunsweredQuestion, mockedId, mockedAnsweredQuestion,
} from '../mocks/questions';
import { questionRepositoryContext, questionRepositoryFindContext } from '../mocks/questionRepository';
import QuestionNotFound from '../../src/errors/QuestionNotFound';
import { cleanDataBase, endConnection } from '../utils/database';

const sut = questionsService;

beforeEach(cleanDataBase);

afterAll(async () => {
  await cleanDataBase();
  await endConnection();
});

describe('Adding new question', () => {
  test('BD offline', async () => {
    questionRepositoryContext.mockImplementationOnce(async () => null);

    const result = sut.addNewQuestion(mockedNewQuestion);
    await expect(result).rejects.toThrowError(QuestionCreationError);
  });

  test('BD online', async () => {
    questionRepositoryContext.mockResolvedValueOnce(1);

    const result = await sut.addNewQuestion(mockedNewQuestion);
    expect(result).toBe(1);
  });
});

describe('Get question', () => {
  test('Question not found', async () => {
    questionRepositoryFindContext.mockImplementationOnce(async () => null);

    const result = sut.getQuestionById(mockedId);
    await expect(result).rejects.toThrowError(QuestionNotFound);
  });

  test('Question not answered', async () => {
    questionRepositoryFindContext.mockResolvedValueOnce(mockedUnunsweredQuestion);
    questionRepositoryFindContext.mockResolvedValueOnce(mockedAnsweredQuestion);

    const result = await sut.getQuestionById(mockedId);
    expect(result).toEqual(mockedUnunsweredQuestion);
  });

  test('Answered question', async () => {
    questionRepositoryFindContext.mockResolvedValueOnce(mockedUnunsweredQuestion);
    questionRepositoryFindContext.mockResolvedValueOnce(mockedAnsweredQuestion);

    const result = await sut.getQuestionById(mockedId);
    expect(result).toEqual(mockedAnsweredQuestion);
  });
});
