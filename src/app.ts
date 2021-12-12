import cors from 'cors';
import express from 'express';
import { serverMiddlewareError } from './middlewares/serverMiddlewareError';
import questionsRouter from './routers/questionsRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);

app.use(serverMiddlewareError);

export default app;
