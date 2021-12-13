import * as usersRepository from '../../src/repositories/usersRepository';

const usersRepositoryCreateUserContext = jest.spyOn(
  usersRepository,
  'createUser',
);

export { usersRepositoryCreateUserContext };
