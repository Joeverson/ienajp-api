import _ from 'lodash';
import DAO from './DAO';
import FacadeException from '../../exceptions/FacadeException';
import Validations from '../../utils/validations';

const dao = new DAO();

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
  async verifyId(id) {
    if (_.isNaN(id)) {
      throw new FacadeException(1, 'error.errorUnexcepted');
    }
    
    if (_.isEmpty(await dao.find(id))) {
      throw new FacadeException(1, 'user.error.userNotExist');
    }
  },
  /**   
   * Método verifica se é um numeral valido
   * para a matricula
   * 
   * @param {String} matriculation 
   */
  checkMatriculationValid(matriculation) {
    if (!Validations.number(Array.from(matriculation))) {
      throw new FacadeException(2, 'user.error.matriculationInvalid');
    }
  },

  /**
   * Método verifica se o tamanho da matricula é valida
   * 
   * @param {String} matriculation 
   */
  verifyLenghtMatriculation(matriculation) {
    if (String(matriculation).slice('').length > 10) {
      throw new FacadeException(2, 'user.error.matriculationLengthInvalid');
    }
  },

  /**
   * Metodo responsável por verificar se a matricula foi passada
   * @param {String} matriculation 
   */
  verifyMatriculationRequired(matriculation) {
    if (!matriculation) {
      throw new FacadeException(2, 'user.error.matriculationRequired');
    }
  },

  /**
   * Método responsável por fazer as checagens 
   * na matricula
   * 
   * @param {String} matriculation 
   */
  validateMatriculation(matriculation) {
    this.verifyMatriculationRequired(matriculation);
    this.verifyLenghtMatriculation(matriculation);
  }
};
