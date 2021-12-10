class TesteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TesteError';
  }
}

export default TesteError;
