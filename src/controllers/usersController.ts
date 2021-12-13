import { NextFunction, Request, Response } from 'express';
import httpStatus from '../enum/statusCode';
import InvalidError from '../errors/InvalidError';
import * as usersService from '../services/usersService';
import { userSchema } from '../validations/schemas/user';

async function createNewUser(req: Request, res: Response, next: NextFunction) {
  const { error: invalidUser } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (invalidUser) {
    const invalidMessages: string[] = invalidUser.details.map(
      ({ message }: { message: string }) => message,
    );

    console.log(invalidUser);

    return res.status(httpStatus.BAD_REQUEST).send(invalidMessages);
  }

  try {
    const createdUser = await usersService.createUser(req.body);

    return res.status(httpStatus.CREATED).send(createdUser);
  } catch (error) {
    if (error instanceof InvalidError) {
      console.log(error);

      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }

    return next(error);
  }
}

export { createNewUser };
