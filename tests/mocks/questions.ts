import faker from 'faker';
import { Question } from '../../src/protocols/questionsInterfaces';
import { AnsweredQuestion } from '../../src/services/questionsService';

const mockedNewQuestion = {
  question: 'O que é, o que é',
  student: 'Winglerson',
  _class: 'T3',
  tags: 'tsc',
};

const mockedUnunsweredQuestion: Question = {
  answered: false,
  submitAt: faker.date.recent(),
  question: faker.random.words(5),
  student: faker.name.findName(),
  _class: faker.name.prefix(),
  tags: faker.name.title(),
};

const mockedAnsweredQuestion: AnsweredQuestion = {
  answered: true,
  submitAt: faker.date.recent(),
  question: faker.random.words(5),
  student: faker.name.findName(),
  _class: faker.name.prefix(),
  tags: faker.name.title(),
  answered_at: faker.date.recent(),
  answered_by: faker.name.findName(),
  answer: faker.random.words(5),
};

const mockedId = faker.datatype.number();

export {
  mockedNewQuestion, mockedUnunsweredQuestion, mockedId, mockedAnsweredQuestion,
};
