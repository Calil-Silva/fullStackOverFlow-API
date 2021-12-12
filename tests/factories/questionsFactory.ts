import connection from '../../src/database';
import { mockedUnunsweredQuestion } from '../mocks/questions';

async function createQuestion() {
  const {
    question,
    student,
    _class,
    tags,
    answered,
    submitAt,
  } = mockedUnunsweredQuestion;

  return connection.query(`
        INSERT INTO questions
            (question, student, class, tags, answered, submited_at)
        VALUES
            ($1, $2, $3, $4, $5, $6);
        `, [question, student, _class, tags, answered, submitAt]);
}

export { createQuestion };
