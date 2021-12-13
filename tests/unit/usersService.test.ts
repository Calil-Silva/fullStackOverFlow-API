import InvalidError from '../../src/errors/InvalidError';
import * as usersService from '../../src/services/usersService';
import { newUser } from '../mocks/user';
import { usersRepositoryCreateUserContext } from '../mocks/userRepository';

const sut = usersService;

describe('Create new user', () => {
  test('BD failure', async () => {
    usersRepositoryCreateUserContext.mockImplementationOnce(async () => null);

    const result = sut.createUser(newUser);
    await expect(result).rejects.toThrowError(InvalidError);
  });

  test('User created', async () => {
    usersRepositoryCreateUserContext.mockImplementationOnce(
      async () => newUser.token,
    );

    const result = await sut.createUser(newUser);
    expect(result).toBe(newUser.token);
  });
});
