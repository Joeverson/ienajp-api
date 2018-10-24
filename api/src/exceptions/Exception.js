import log from '../utils/logger';

export default class Exception {
  constructor(code, message, type, data) {
    if (this.constructor === Exception) {
      throw new TypeError('Can not construct abstract class.');
    }

    this.code = code;
    this.message = message;
    this.type = type;
    this.data = data || [];

    log.error(type, message);
  }
}
