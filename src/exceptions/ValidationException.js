import Exception from './Exception';

export default class ValidationException extends Exception {
  constructor(code, message, data) {
    super(code, message, 'ValidationException', data);
  }
}
