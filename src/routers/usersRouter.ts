import express from 'express';
import * as usersController from '../controllers/usersController';

const router = express.Router();

router.post('/', usersController.createNewUser);

export default router;
