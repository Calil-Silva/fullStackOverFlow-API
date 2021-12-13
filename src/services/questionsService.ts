import InvalidError from '../errors/InvalidError';
import NotFound from '../errors/NotFound';
import QuestionCreationError from '../errors/QuestionCreationError';
import { AddAnswer, Answer } from '../protocols/answersInterfaces';
import { NewQuestion, Question } from '../protocols/questionsInterfaces';
import * as questionsRepository from '../repositories/questionsRepository';
import * as usersService from '../services/usersService';

async function addNewQuestion(newQuestion: NewQuestion) {
  const addedQuestion = await questionsRepository.createNewQuestion(
    newQuestion,
  );

  if (!addedQuestion) {
    throw new QuestionCreationError(`
    Não foi possível completar a operação no momento, verifique os campos digitados e tente novamente.`);
  }

  return addedQuestion;
}

export type AnsweredQuestion = Question & Answer;

async function getQuestionById(
  id: number,
): Promise<AnsweredQuestion | Question> {
  const question = await questionsRepository.findQuestionById(id);
  const isAnswered = question?.answered;

  if (!question) {
    throw new NotFound('Questão não disponível');
  }

  if (!isAnswered) {
    return question;
  }

  const answer = await questionsRepository.findAnswerById(id);

  return { ...question, ...answer };
}

async function answerQuestion(answerParams: AddAnswer) {
  const { questionId, token } = answerParams;

  const question = await questionsRepository.findQuestionById(questionId);

  if (!question) {
    throw new NotFound('Questão não disponível');
  }

  const isAlreadyAnswered = await questionsRepository.findAnswerById(
    questionId,
  );

  if (isAlreadyAnswered) {
    throw new InvalidError('Esta questão já foi respondida');
  }

  const userId = await usersService.userValidation(token);

  const body = { ...answerParams, answeredBy: userId };

  const answer = await questionsRepository.addAnswer(body);

  if (!answer) {
    throw new InvalidError('Ocorreu um problema, tente mais tarde');
  }

  return answer;
}

async function getUnunsweredQuestions() {
  const questions = await questionsRepository.findUnunsweredQuestions();

  if (!questions) {
    throw new NotFound('Não encontramos nenhuma questão não respondida');
  }

  return questions;
}

export {
  addNewQuestion,
  getQuestionById,
  answerQuestion,
  getUnunsweredQuestions,
};
