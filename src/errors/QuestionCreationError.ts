class QuestionCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuestionCreationError';
  }
}

export default QuestionCreationError;
