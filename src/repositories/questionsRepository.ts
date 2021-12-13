import connection from '../database';
import { AddAnswer, Answer } from '../protocols/answersInterfaces';
import { NewQuestion, Question } from '../protocols/questionsInterfaces';

async function createNewQuestion(newQuestion: NewQuestion) {
  const { question, student, _class, tags } = newQuestion;

  const insertQuestion = await connection.query(
    `
        INSERT INTO questions (question, student, class, tags) VALUES ($1, $2, $3, $4) RETURNING id;
        `,
    [question, student, _class, tags],
  );

  if (insertQuestion.rowCount === 0) return null;

  return insertQuestion.rows[0];
}

async function findQuestionById(id: number): Promise<Question> {
  const question = await connection.query(
    `
    SELECT * FROM questions WHERE id = $1;
    `,
    [id],
  );

  return question.rows[0];
}

async function findAnswerById(id: number): Promise<Answer> {
  const answer = await connection.query(
    `
    SELECT answers.answered_at as answeredAt, users.name as answeredBy, answer 
      FROM answers 
    JOIN users ON users.id = answers.answered_by
      WHERE question_id = $1;
    `,
    [id],
  );

  return answer.rows[0];
}

async function addAnswer(answerParams: AddAnswer) {
  const { questionId, answeredBy, answer } = answerParams;

  await connection.query(
    `
    UPDATE questions SET answered = true WHERE id = $1;
  `,
    [questionId],
  );

  const newAnswer = await connection.query(
    `
    INSERT INTO answers (question_id, answered_at, answered_by, answer) VALUES ($1, $2, $3, $4) RETURNING answer;
    `,
    [questionId, new Date(), answeredBy, answer],
  );

  if (newAnswer.rowCount === 0) return null;

  return newAnswer.rows[0];
}

export { createNewQuestion, findQuestionById, findAnswerById, addAnswer };
