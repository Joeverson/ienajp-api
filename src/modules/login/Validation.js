import _ from 'lodash';
import validations from '../../utils/validations';
// import model from '../../db/models';
import ValidationException from '../../exceptions/ValidationException';

/**
 * @class SectorValidation
 * Class responsible for carrying out validations for the sector
 */
export default {
  /**
   * Method responsible for verifying if the sector already exists in the database
   * and the attribute id of sector is int.
   * @param sector sector to be validated
   */
  async idValid(id) {
    // todo - ir ao banco vê se eexiste mesmo o usuario com esse id
    if (_.isNaN(id)) {
      throw new ValidationException(1, 'error.errorUnexcepted');
    }
    
    // if (_.isEmpty(await model.User.findById(id))) {
    //   throw new ValidationException(1, 'user.error.userNotExist');
    // }
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
