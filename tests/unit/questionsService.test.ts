import InvalidError from '../../src/errors/InvalidError';
import NotFound from '../../src/errors/NotFound';
import QuestionCreationError from '../../src/errors/QuestionCreationError';
import * as questionsRepository from '../../src/repositories/questionsRepository';
import * as usersRepository from '../../src/repositories/usersRepository';
import * as questionsService from '../../src/services/questionsService';
import * as usersService from '../../src/services/usersService';
import {
  questionRepositoryContext,
  questionRepositoryFindContext,
} from '../mocks/questionRepository';
import {
  mockedAnswer,
  mockedAnsweredQuestion,
  mockedCreatedAnswer,
  mockedId,
  mockedNewQuestion,
  mockedUnunsweredQuestion,
} from '../mocks/questions';
import { cleanDataBase, endConnection } from '../utils/database';

const sut = questionsService;

beforeEach(cleanDataBase);

afterEach(async () => {
  await cleanDataBase();
  // jest.restoreAllMocks();
});

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
    await expect(result).rejects.toThrowError(NotFound);
  });

  test('Question not answered', async () => {
    questionRepositoryFindContext.mockResolvedValueOnce(
      mockedUnunsweredQuestion,
    );
    questionRepositoryFindContext.mockResolvedValueOnce(mockedAnsweredQuestion);

    const result = await sut.getQuestionById(mockedId);
    expect(result).toEqual(mockedUnunsweredQuestion);
  });

  test('Answered question', async () => {
    questionRepositoryFindContext.mockResolvedValueOnce(
      mockedUnunsweredQuestion,
    );
    questionRepositoryFindContext.mockResolvedValueOnce(mockedAnsweredQuestion);

    const result = await sut.getQuestionById(mockedId);
    expect(result).toEqual(mockedAnsweredQuestion);
  });
});

describe('Post answer', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Question not found', async () => {
    questionRepositoryFindContext.mockImplementationOnce(async () => null);

    const result = sut.answerQuestion(mockedAnswer);
    await expect(result).rejects.toThrowError(NotFound);
  });

  test('Question already answered', async () => {
    jest
      .spyOn(questionsRepository, 'findQuestionById')
      .mockImplementationOnce(async () => mockedUnunsweredQuestion);
    jest
      .spyOn(questionsRepository, 'findAnswerById')
      .mockImplementationOnce(async () => mockedCreatedAnswer);

    const result = sut.answerQuestion(mockedAnswer);
    await expect(result).rejects.toThrowError(InvalidError);
  });

  test('User not found', async () => {
    jest
      .spyOn(questionsRepository, 'findQuestionById')
      .mockImplementationOnce(async () => mockedUnunsweredQuestion);
    jest
      .spyOn(questionsRepository, 'findAnswerById')
      .mockImplementationOnce(async () => null);
    jest
      .spyOn(usersRepository, 'findUserByToken')
      .mockImplementationOnce(async () => null);

    const result = sut.answerQuestion(mockedAnswer);
    await expect(result).rejects.toThrowError(NotFound);
  });

  test('BD offline', async () => {
    jest
      .spyOn(questionsRepository, 'findQuestionById')
      .mockImplementationOnce(async () => mockedUnunsweredQuestion);
    jest
      .spyOn(questionsRepository, 'findAnswerById')
      .mockImplementationOnce(async () => null);
    jest
      .spyOn(usersService, 'userValidation')
      .mockImplementationOnce(async () => 1);
    jest
      .spyOn(questionsRepository, 'addAnswer')
      .mockImplementationOnce(async () => null);

    const result = sut.answerQuestion(mockedAnswer);
    await expect(result).rejects.toThrowError(InvalidError);
  });

  test('All params are valid', async () => {
    jest
      .spyOn(questionsRepository, 'findQuestionById')
      .mockImplementationOnce(async () => mockedUnunsweredQuestion);
    jest
      .spyOn(questionsRepository, 'findAnswerById')
      .mockImplementationOnce(async () => null);
    jest
      .spyOn(usersService, 'userValidation')
      .mockImplementationOnce(async () => 1);
    jest
      .spyOn(questionsRepository, 'addAnswer')
      .mockImplementationOnce(async () => mockedAnswer.answer);

    const result = await sut.answerQuestion(mockedAnswer);
    expect(result).toBe(mockedAnswer.answer);
  });
});
