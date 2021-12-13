import * as questionsRepository from '../../src/repositories/questionsRepository';

const questionRepositoryContext = jest.spyOn(
  questionsRepository,
  'createNewQuestion',
);

const questionRepositoryFindContext = jest.spyOn(
  questionsRepository,
  'findQuestionById',
);

const questionRepositoryAnswerContext = jest.spyOn(
  questionsRepository,
  'addAnswer',
);

export {
  questionRepositoryContext,
  questionRepositoryFindContext,
  questionRepositoryAnswerContext,
};
