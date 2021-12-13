import * as usersRepository from '../../src/repositories/usersRepository';

const usersRepositoryCreateUserContext = jest.spyOn(
  usersRepository,
  'createUser',
);

const usersRepositoryFindUserContext = jest.spyOn(
  usersRepository,
  'findUserByToken',
);

export { usersRepositoryCreateUserContext, usersRepositoryFindUserContext };
