import * as questionsRepository from '../repositories/questionsRepository';
import { Question } from '../protocols/questionsInterfaces';
import QuestionCreationError from '../errors/questionCreationError';

async function addNewQuestion(newQuestion: Question) {
  const addedQuestion = questionsRepository.createNewQuestion(newQuestion);

  if (!addedQuestion) {
    throw new QuestionCreationError(`
    Não foi possível completar a operação no momento, verifique os campos digitados e tente novamente.`);
  }

  return addedQuestion;
}

export { addNewQuestion };
