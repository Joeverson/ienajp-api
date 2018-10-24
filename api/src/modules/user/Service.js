import lodash from 'lodash';
import FacadeException from '../../exceptions/FacadeException';
import DAO from './DAO';
import log from '../../utils/logger';
import _ from '../../utils/validations';
import utils from '../../utils/utils';
import UserValidation from './Validation';

const dao = new DAO();
const COLUMNS = ['id', 'name', 'email', 'matriculation'];
const FILTERABLES = ['name', 'email', 'matriculation'];

export default {
  
  // Retorna todos os setores ativos e que não sao de retrabalho de uma area especifica
  async count() {
    log.info('[user] - [/GET] HTTP Request :: count');
    
    const res = await dao.count();
    return res;
  },
  
  async countCustom(filter = null) {
    log.info('[user] - [/GET] HTTP Request :: countCustom');
    const filterValue = filter ? utils.decodeValue(filter) : null;

    const res = await dao.countCustom(filterValue, FILTERABLES);
    return res;
  },

  async paginate(pagePos, pageSize, order, orderBy) {
    log.info('[user] - [/GET] HTTP Request :: paginate');

    const res = await dao.paginate(pagePos, pageSize, order, orderBy);
    return res;
  },

  async paginateByFilter(pagePos, pageSize, filter, order, orderBy) {
    log.info('[user] - [/GET] HTTP Request :: paginateByFilter');
    
    const res = await dao.paginateByFilter(
      COLUMNS,
      pagePos,
      pageSize,
      FILTERABLES,
      filter,
      order,
      orderBy
    );
    return res;
  },

  /**
   * Método responsável por delegar o metodo responsável por realizar
   * o retorno tanto para a páginação normal quanto para a páginação
   * com campo Filtro
   * @param {Object} params 
   */
  async delegateFilter(params) {
    log.info('[user] - [/GET] HTTP Request :: delegateFilter');

    if (params.pagePos && params.pageSize && params.filter) {
      const filterValue = utils.decodeValue(params.filter);

      const users = await this.paginateByFilter(
        params.pagePos,
        params.pageSize,
        filterValue,
        params.order,
        params.orderBy
      );

      return users;
    }

    if (params.pagePos && params.pageSize) {
      const users = await this.paginate(
        params.pagePos,
        params.pageSize,
        params.order,
        params.orderBy
      );
      
      return users;
    }

    const users = await this.getByBlocked(false);
    
    return users;
  },

  async insert(user) {
    log.info('[user] - [/POST] HTTP Request :: insert');
    
    if (!_.isInteger(user.id_user_created)) {
      throw new FacadeException(2, 'user.error.userNotIdentified');
    }

    await this.check(user);
    user.password = await this.getPasswordEncrypted(user.password);
    const res = await dao.insert(user);
    return res;
  },

  async update(user) {
    log.info('[user] - [/PUT] HTTP Request :: update');

    if (!user.id && !_.isInteger(user.id)) {
      throw new FacadeException(2, 'user.error.userNotIdentified');
    }

    await this.check(user);
    
    if (user.password) {
      user.password = await this.getPasswordEncrypted(user.password);
    }
    const res = await dao.update(user.id, user);
    
    return res;
  },

  async delete(id) {
    log.info('[user] - [/DELET] HTTP Request :: delete');

    if (!_.isInteger(id)) {
      throw new FacadeException(2, 'user.error.idInvalid');
    }
    const res = await dao.delete(id, 'user.error.notPossibleDelete');
    return res;
  },

  /**
   * 
   * exists the user, passing the u_id
   * 
   */
  async getUser(id) {
    log.info('[user] - [/GET] HTTP Request :: getUser');

    if (!_.isInteger(id)) {
      throw new FacadeException(2, 'user.error.idInvalid');
    }

    const u = await dao.find(id);
    return u;
  },
  /**
   * verificando se o usuario esta bloqueado ou não
   * 
   */
  async isBlocked(id) {
    log.info('[user] - [/GET] HTTP Request :: getUser');

    if (!_.isInteger(id)) {
      throw new FacadeException(2, 'user.error.idInvalid');
    }

    const u = await dao.isBlocked(id);
    
    return lodash.isUndefined(u) ? false : u;
  },

  /**
   * Metodo responsável por verificar se o usuário estar validado
   * 
   * @param {User} user objeto usuario
   * 
   * @return throw {error : 'msg'}
  */
  async check(user) {
    if (!_.isEmailValid(user.email)) {
      throw new FacadeException(2, 'user.error.emailInvalid');
    }

    if (await this.hasMatriculation(user.matriculation, user.id)) {
      throw new FacadeException(2, 'user.error.matriculationExist');
    }

    if (user.email.trim().length > 150) {
      throw new FacadeException(2, 'user.error.emailLenghtInvalid');
    }

    if ((user.id && !_.isEmpty(user.password)) && !_.isPasswordValid(user.password)) {
      throw new FacadeException(2, 'user.error.passwordInvalid');
    }

    if ((user.id && !_.isEmpty(user.password)) && !_.isPasswordLengthValid(user.password)) {
      throw new FacadeException(2, 'user.error.passwordInvalidLength');
    }

    if (!user.id && !_.isPasswordValid(user.password)) {
      throw new FacadeException(2, 'user.error.passwordInvalid');
    }

    if (!user.id && !_.isPasswordLengthValid(user.password)) {
      throw new FacadeException(2, 'user.error.passwordInvalidLength');
    }

    if (!_.isNameUserValid(user.name)) {
      throw new FacadeException(2, 'user.error.nameInvalid');
    }

    if (await dao.existsEmail(user, !_.isEmpty(user.id))) {
      throw new FacadeException(2, 'user.error.emailAlreadyExists');
    }

    if (!user.id_access_profile) {
      throw new FacadeException(2, 'user.error.accessProfileRequired');
    }

    if (!_.isInteger(user.id_access_profile)) {
      throw new FacadeException(2, 'user.error.accessProfileNotNumber');
    }
  },

  async getPasswordEncrypted(password) {
    log.info('[user] - [/GET] HTTP Request :: getPasswordEncrypted');

    if (_.isEmpty(password)) {
      throw new FacadeException(2, 'user.error.passwordRequired');
    }

    const res = await utils.getPasswordEncrypted(password);
    return res;
  },

  async find(id) {
    log.info('[user] - [/GET] HTTP Request :: find');

    if (!_.isInteger(id)) {
      throw new FacadeException(2, 'user.error.idInvalid');
    }
    
    const res = await dao.find(id);
    
    if (res[0]) {
      res[0].password = null;
    }

    return res;
  },

  /**
   * Metodo responsável por retornar um usuario atraves da sua matricula e do seu password
   * 
   * @param {String} matriculation 
   * @param {String} password
   * @return {User} 
   */
  async getByMatriculationAndPassword(matriculation, password) {
    if (!matriculation) {
      throw new FacadeException(2, 'user.error.matriculationRequired');
    }

    if (_.isEmpty(password)) {
      throw new FacadeException(2, 'user.error.passwordRequired');
    }

    const user = await dao.findByMatriculationAndPassword(matriculation, password);

    return user;
  },
  /**
   * Método responsavel por verifica se existe um usuario 
   * com um determnada matricula previamente informada
   * 
   * @param {String} matriculation 
   * @param {int} id
   * 
   * @return {User} user - Objeto do usuário que contem a matricula informada.
   */  
  async hasMatriculation(matriculation, id = null) {
    UserValidation.validateMatriculation(matriculation);
    const user = await dao.findByMatriculation(matriculation, id);
    return user;
  },

  /**
   * Metodo responsável por verificar se a matricula está condizente com o esperado
   * 
   * @param {String} matriculation 
   * @return {User} 
   */
  async verifyMatriculation(matriculation) {
    const user = await this.hasMatriculation(matriculation);

    if (!user) {
      throw new FacadeException(2, 'user.error.matriculationNotExist');
    }

    return user;
  },

  /**
   * Metodo responsável por verificar se o usuário é válido para a aplicação
   * Verificando se é ativo e se não é bloqueado
   * @param {int} id 
   */
  async verifyIdAndBloqued(id) {
    if (!id) {
      throw new FacadeException(2, 'user.error.idEmpty');
    }

    if (!Number.isInteger(parseInt(id))) {
      throw new FacadeException(2, 'user.error.operatorInvalid');
    }

    const user = await this.find(id);

    if (lodash.isUndefined(user[0])) {
      throw new FacadeException(2, 'user.error.operatorNotExist');
    }

    this.verifyBloqued(user[0]);
  },

  /**
   * Metodo responsável por verifificar se o usuário está bloqueado
   * @param {User} user
   * @param {String} 
   */
  verifyBloqued(user, message = null) {
    const messageError = message || 'userBlocked';

    if (user.blocked) {
      throw new FacadeException(2, `user.error.${messageError}`);
    }
  },

  /**
   * Metodo responsável por pegar os usuários através variavel passada
   * Caso seja passado True, irá retornar todos os usuários bloqueados
   * Caso seja passado false, irá retornar todos os usuários ativos
   *  
   * @param {Boolean} isBlocked 
   */
  async getByBlocked(isBlocked) {
    log.info('[User] - [/GET] HTTP Request :: getByBlocked');

    const users = await dao.findByBlocked(isBlocked);

    return users;
  },

  async getByEmailAndPassword(email, encryptedPassword) {
    // Temporary double encryption
    const doubleEncryptedPassword = utils.getPasswordEncrypted(encryptedPassword);
    await this.checkEmailAndPassword(email, doubleEncryptedPassword);
    const res = await dao.getByEmailAndPassword(email, doubleEncryptedPassword);
    return res;
  },

  async checkEmailAndPassword(email, doubleEncryptedPassword) {
    if (!_.isStringBetweenLength(email, 1, 150)) {
      throw new FacadeException(2, 'user.error.emailLength');
    }
    if (!_.isStringBetweenLength(doubleEncryptedPassword, 1, 32)) {
      throw new FacadeException(2, 'user.error.passwordLength');
    }
  }
};
