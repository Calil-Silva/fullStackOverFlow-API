import * as questionsRepository from '../repositories/questionsRepository';
import { NewQuestion, Question } from '../protocols/questionsInterfaces';
import QuestionCreationError from '../errors/questionCreationError';
import { Answer } from '../protocols/answersInterfaces';
import QuestionNotFound from '../errors/QuestionNotFound';

async function addNewQuestion(newQuestion: NewQuestion) {
  const addedQuestion = await questionsRepository.createNewQuestion(newQuestion);

  if (!addedQuestion) {
    throw new QuestionCreationError(`
    Não foi possível completar a operação no momento, verifique os campos digitados e tente novamente.`);
  }

  return addedQuestion;
}

type AnsweredQuestion = NewQuestion & Answer;

async function getQuestionById(id: number): Promise<AnsweredQuestion | Question> {
  const question = await questionsRepository.findQuestionById(id);
  const isAnswered = question?.answered;

  if (!question) {
    throw new QuestionNotFound('Questão não disponível');
  }

  if (!isAnswered) {
    return question;
  }

  const answer = await questionsRepository.findAnswerById(id);

  return { ...question, ...answer };
}

export { addNewQuestion, getQuestionById };
