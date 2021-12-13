import connection from '../database';
import { NewUserValidation } from '../protocols/usersInterfaces';

async function createUser(user: NewUserValidation): Promise<string | null> {
  const { name, _class, token } = user;

  const newUser = await connection.query(
    `
  INSERT INTO users (name, class, token) VALUES ($1, $2, $3) RETURNING token;
        `,
    [name, _class, token],
  );

  if (newUser.rowCount === 0) return null;

  return newUser.rows[0];
}

async function findUserByToken(token: string) {
  const user = await connection.query(
    `
    SELECT * FROM users WHERE token = $1;
    `,
    [token],
  );

  if (!user) return null;

  return user.rows[0].id;
}

export { createUser, findUserByToken };
