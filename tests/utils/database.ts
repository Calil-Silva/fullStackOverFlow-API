import connection from '../../src/database';

async function cleanDataBase() {
  await connection.query('TRUNCATE questions RESTART IDENTITY');
}

async function endConnection() {
  await connection.end();
}

export { cleanDataBase, endConnection };
