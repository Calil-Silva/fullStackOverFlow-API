import connection from '../database';
import { Answer } from '../protocols/answersInterfaces';
import { NewQuestion, Question } from '../protocols/questionsInterfaces';

async function createNewQuestion(newQuestion: NewQuestion) {
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

  return insertQuestion.rows[0];
}

async function findQuestionById(id: number): Promise<Question> {
  const question = await connection.query(`
    SELECT * FROM questions WHERE id = $1;
    `, [id]);

  return question.rows[0];
}

async function findAnswerById(id: number): Promise<Answer> {
  const answer = await connection.query(`
    SELECT answered_at as answeredAt, answered_by as answeredBy, answer FROM answers WHERE question_id = $1;
    `, [id]);

  return answer.rows[0];
}

export {
  createNewQuestion,
  findQuestionById,
  findAnswerById,
};
