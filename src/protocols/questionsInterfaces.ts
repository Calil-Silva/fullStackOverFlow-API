interface NewQuestion {
  question: string;
  student: string;
  _class: string;
  tags: string;
}

interface Question extends NewQuestion {
  answered: boolean;
  submitAt: Date;
}

interface Questions {
  id: number;
  question: string;
  student: string;
  class: string;
  submitedAt: Date;
}

export { NewQuestion, Question, Questions };
