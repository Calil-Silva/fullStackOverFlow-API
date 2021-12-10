import * as questionsRepository from '../../src/repositories/questionsRepository';

const questionRepositoryContext = jest.spyOn(questionsRepository, 'createNewQuestion');

export { questionRepositoryContext };
