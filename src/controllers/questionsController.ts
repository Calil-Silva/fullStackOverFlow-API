import { Request, Response } from 'express';
import httpStatus from '../enum/statusCode';
import QuestionCreationError from '../errors/QuestionCreationError';
import QuestionNotFound from '../errors/QuestionNotFound';
import * as questionsService from '../services/questionsService';
import { questionSchema } from '../validations/schemas/question';

async function addQuestion(req: Request, res: Response) {
  const { error: invalidQuestion } = questionSchema.validate(req.body, { abortEarly: false });

  if (invalidQuestion) {
    const invalidMessages: string[] = invalidQuestion.details
      .map(({ message }: {message: string}) => message);

    console.log(invalidQuestion);

    return res.status(httpStatus.BAD_REQUEST).send(invalidMessages);
  }

  try {
    const newQuestion = await questionsService.addNewQuestion(req.body);

    return res.status(httpStatus.OK).send(newQuestion);
  } catch (error) {
    if (error instanceof QuestionCreationError) {
      console.log(error);

      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }

    return res.sendStatus(httpStatus.SERVER_ERROR);
  }
}

async function getQuestion(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const question = await questionsService.getQuestionById(id);

    return res.status(httpStatus.OK).send(question);
  } catch (error) {
    if (error instanceof QuestionNotFound) {
      console.log(error.message);
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    console.log(error);
    return res.sendStatus(httpStatus.SERVER_ERROR);
  }
}

export {
  addQuestion,
  getQuestion,
};
