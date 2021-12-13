import connection from '../../src/database';
import { newUser } from '../mocks/user';

async function createUser() {
  const { token, name, _class } = newUser;

  const user = await connection.query(
    `
    INSERT INTO users (name, class, token) VALUES ($1, $2, $3) RETURNING token;
    `,
    [name, _class, token],
  );

  return user.rows[0].token;
}

export { createUser };
