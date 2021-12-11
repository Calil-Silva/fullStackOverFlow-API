import connection from '../database';
import { NewQuestion, UnansweredQuestion } from '../protocols/questionsInterfaces';

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

async function getQuestionById(id: number): Promise<UnansweredQuestion> {
  const question = await connection.query(`
  SELECT * FROM questions WHERE id = $1;
  `, [id]);

  return question.rows[0];
}

export {
  createNewQuestion,
  getQuestionById,
};
