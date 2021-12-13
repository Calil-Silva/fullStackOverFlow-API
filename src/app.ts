import cors from 'cors';
import express from 'express';
import usersRouter from '../src/routers/usersRouter';
import { serverMiddlewareError } from './middlewares/serverMiddlewareError';
import questionsRouter from './routers/questionsRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.use('/users', usersRouter);

app.use(serverMiddlewareError);

export default app;
