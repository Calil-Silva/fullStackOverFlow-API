import { v4 as uuid } from 'uuid';
import InvalidError from '../errors/InvalidError';
import { NewUser, NewUserValidation } from '../protocols/usersInterfaces';
import * as usersRepository from '../repositories/usersRepository';

async function createUser(user: NewUser): Promise<string> {
  const userCredentials: NewUserValidation = { ...user, token: uuid() };

  const createdUser = await usersRepository.createUser(userCredentials);

  if (!user) {
    throw new InvalidError('Um problema ocorreu');
  }

  return createdUser;
}

export { createUser };
