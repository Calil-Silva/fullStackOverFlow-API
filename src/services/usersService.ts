import { v4 as uuid } from 'uuid';
import InvalidError from '../errors/InvalidError';
import NotFound from '../errors/NotFound';
import { NewUser, NewUserValidation } from '../protocols/usersInterfaces';
import * as usersRepository from '../repositories/usersRepository';

async function createUser(user: NewUser): Promise<string> {
  const userCredentials: NewUserValidation = { ...user, token: uuid() };

  const createdUser = await usersRepository.createUser(userCredentials);

  if (!createdUser) {
    throw new InvalidError('Um problema ocorreu');
  }

  return createdUser;
}

async function userValidation(token: string) {
  const user = await usersRepository.findUserByToken(token);

  if (!user) {
    throw new NotFound('Usuário não encontrado');
  }

  return user;
}

export { createUser, userValidation };
