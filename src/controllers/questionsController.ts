import { Request, Response } from 'express';
import * as questionsService from '../services/questionsService';

async function addQuestion(req: Request, res: Response) {
  // const {
  //   question,
  //   student,
  //   _class,
  //   tags,
  // } = req.body;

  try {
    const newQuestion = await questionsService.addNewQuestion(req.body);
    return res.status(200).send(newQuestion.toString());
  } catch (error) {
    return res.status(500).send({ message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' });
  }
}

export {
  addQuestion,
};
