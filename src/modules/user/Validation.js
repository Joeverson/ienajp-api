import _ from 'lodash';
import validations from '../../utils/validations';
import model from './Model';
import ValidationException from '../../exceptions/ValidationException';

/**
 * @class SectorValidation
 * Class responsible for carrying out validations for the sector
 */
export default {
  /**
   * Validando se o usuario já existe
   */
  async existsUser(name, password) {
    // todo - ir ao banco vê se eexiste mesmo o usuario com esse id
    
    const data = await model.find({ name, password: { $gte: password} }).exec()
    if (data.length > 0) {
      throw new ValidationException(1, 'user.error.userExist');
    }
  },

  /**
   * valida se é um email valido
   * @param {String} email 
   */
  emailValid(email) {
    // todo - deve ir no banco para poder saber se já existe algum email
    if (!validations.isEmailValid(email)) {
      throw new ValidationException(2, 'user.error.emailInvalid');
    }
  },

  /**
   * Validando se a senha é uma senha valida
   * @param {String} password 
   */
  passwordValid(password) {
    if (validations.isEmpty(password) && !validations.isPasswordValid(password)) {
      throw new ValidationException(2, 'user.error.passwordInvalid');
    }
  },

  /**
   * Validando se a senha é uma senha valida
   * @param {String} password 
   */
  passwordLengthValid(password) {
    if (validations.isEmpty(password) && !validations.isPasswordLengthValid(password)) {
      throw new ValidationException(2, 'user.error.passwordInvalid');
    }
  },

  /**
   * validando se o nome é um nome valido
   * @param {String} name 
   */
  nameValid(name) {
    if (!validations.isNameUserValid(name)) {
      throw new ValidationException(2, 'user.error.nameInvalid');
    }
  },

  /**
   * validando se o nome é um nome valido
   * @param {String} name 
   */
  userTypeValid(userTypeId) {
    // todo - search in db

    if (!validations.isInteger(userTypeId) && validations.isEmpty(userTypeId)) {
      throw new ValidationException(2, 'user.error.nameInvalid');
    }
  }
  
};
