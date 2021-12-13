import connection from '../../src/database';

async function cleanDataBase() {
  await connection.query('TRUNCATE questions RESTART IDENTITY CASCADE');
  await connection.query('TRUNCATE users RESTART IDENTITY CASCADE');
}

async function endConnection() {
  await connection.end();
}

export { cleanDataBase, endConnection };
