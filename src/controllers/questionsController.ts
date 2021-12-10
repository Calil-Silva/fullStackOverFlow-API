import { Request, Response } from 'express';
import * as questionsService from '../services/questionsService';
import { questionSchema } from '../validations/schemas/question';
import httpStatus from '../enum/statusCode';
import QuestionCreationError from '../errors/questionCreationError';

async function addQuestion(req: Request, res: Response) {
  const { error: invalidQuestion } = questionSchema.validate(req.body, { abortEarly: false });

  if (invalidQuestion) {
    const invalidMessages = invalidQuestion.details.map(({ message }) => message);
    console.log(invalidQuestion);

    return res.status(httpStatus.BAD_REQUEST).send(invalidMessages);
  }

  try {
    const newQuestion = await questionsService.addNewQuestion(req.body);

    return res.status(httpStatus.OK).send(newQuestion.toString());
  } catch (error) {
    if (error instanceof QuestionCreationError) {
      console.log(error);
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }

    return res.sendStatus(httpStatus.SERVER_ERROR);
  }
}

export {
  addQuestion,
};
