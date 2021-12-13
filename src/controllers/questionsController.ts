import { NextFunction, Request, Response } from 'express';
import httpStatus from '../enum/statusCode';
import InvalidError from '../errors/InvalidError';
import NotFound from '../errors/NotFound';
import QuestionCreationError from '../errors/QuestionCreationError';
import * as questionsService from '../services/questionsService';
import { questionSchema } from '../validations/schemas/question';

async function addQuestion(req: Request, res: Response, next: NextFunction) {
  const { error: invalidQuestion } = questionSchema.validate(req.body, {
    abortEarly: false,
  });

  if (invalidQuestion) {
    const invalidMessages: string[] = invalidQuestion.details.map(
      ({ message }: { message: string }) => message,
    );

    console.error(invalidQuestion);

    return res.status(httpStatus.BAD_REQUEST).send(invalidMessages);
  }

  try {
    const newQuestion = await questionsService.addNewQuestion(req.body);

    return res.status(httpStatus.OK).send(newQuestion);
  } catch (error) {
    if (error instanceof QuestionCreationError) {
      console.error(error);

      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }

    return next(error);
  }
}

async function getQuestion(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  try {
    const question = await questionsService.getQuestionById(id);

    return res.status(httpStatus.OK).send(question);
  } catch (error) {
    if (error instanceof NotFound) {
      console.error(error);

      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return next(error);
  }
}

async function postAnswer(req: Request, res: Response, next: NextFunction) {
  const questionId = Number(req.params.id);
  const token = req.headers.authorization?.replace('Bearer ', '');

  const body = { ...req.body, questionId, token };

  try {
    const answer = await questionsService.answerQuestion(body);

    return res.status(httpStatus.ACCEPTED).send(answer);
  } catch (error) {
    if (error instanceof NotFound) {
      console.error(error);

      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    if (error instanceof InvalidError) {
      console.error(error);

      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return next(error);
  }
}

export { addQuestion, getQuestion, postAnswer };
