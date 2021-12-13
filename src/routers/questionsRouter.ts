import express from 'express';
import * as questionsController from '../controllers/questionsController';

const router = express.Router();

router.post('/', questionsController.addQuestion);
router.get('/', questionsController.getUnunsweredQuestions);
router.get('/:id', questionsController.getQuestion);
router.post('/:id', questionsController.postAnswer);

export default router;
