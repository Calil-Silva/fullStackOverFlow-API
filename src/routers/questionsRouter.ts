import express from 'express';
import * as questionsController from '../controllers/questionsController';

const router = express.Router();

router.post('/', questionsController.addQuestion);
router.get('/:id', questionsController.getQuestion);

export default router;
