import connection from '../database';
import { Question } from '../protocols/questionsProtocols';

async function createNewQuestion(newQuestion: Question) {
  const {
    question,
    student,
    _class,
    tags,
  } = newQuestion;

  const insertQuestion = await connection.query(`
        INSERT INTO questions (question, student, class, tags) VALUES ($1, $2, $3, $4) RETURNING id;
        `, [question, student, _class, tags]);

  if (insertQuestion.rowCount === 0) return null;

  return insertQuestion.rows[0].id;
}

export {
  createNewQuestion,
};
