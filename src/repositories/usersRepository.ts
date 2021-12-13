import connection from '../database';
import { NewUserValidation } from '../protocols/usersInterfaces';

async function createUser(user: NewUserValidation): Promise<string | null> {
  const { name, _class, token } = user;

  const newUser = await connection.query(
    `
  INSERT INTO users (name, class, token) VALUES ($1, $2, $3);
        `,
    [name, _class, token],
  );

  if (newUser.rowCount === 0) return null;

  return newUser.rows[0];
}

export { createUser };
