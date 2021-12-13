class InvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidError';
  }
}

export default InvalidError;
