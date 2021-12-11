import * as questionsService from '../../src/services/questionsService';
import QuestionCreationError from '../../src/errors/QuestionCreationError';
import { question } from '../mocks/questions';
import { questionRepositoryContext } from '../mocks/questionRepository';

const sut = questionsService;

describe('Adding new question', () => {
  test('BD offline', async () => {
    questionRepositoryContext.mockImplementationOnce(async () => null);

    const result = sut.addNewQuestion(question);
    await expect(result).rejects.toThrowError(QuestionCreationError);
  });

  test('BD online', async () => {
    questionRepositoryContext.mockResolvedValueOnce(1);

    const result = await sut.addNewQuestion(question);
    expect(result).toBe(1);
  });
});
