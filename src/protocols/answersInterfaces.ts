interface Answer {
  questionId?: number;
  answeredAt?: Date;
  answeredBy?: number;
  answer: string;
}

interface AddAnswer extends Answer {
  token: string;
}

export { Answer, AddAnswer };
