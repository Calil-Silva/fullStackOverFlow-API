import faker from 'faker';
import {
  NewUser,
  NewUserValidation,
} from '../../src/protocols/usersInterfaces';

const user: NewUser = {
  name: faker.name.findName(),
  _class: faker.random.word(),
};

const invalidUser: NewUser = {
  name: '',
  _class: '',
};

const newUser: NewUserValidation = {
  token: faker.datatype.uuid(),
  name: faker.name.findName(),
  _class: faker.random.word(),
};

export { newUser, user, invalidUser };
