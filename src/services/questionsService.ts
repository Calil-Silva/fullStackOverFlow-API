import * as questionsRepository from '../repositories/questionsRepository';
import { Question } from '../protocols/questionsProtocols';

async function addNewQuestion(newQuestion: Question) {
  const addedQuestion = questionsRepository.createNewQuestion(newQuestion);

  if (!addedQuestion) return null;

  return addedQuestion;
}

export { addNewQuestion };
