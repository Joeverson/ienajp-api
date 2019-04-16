import _ from 'lodash'
import moment from 'moment'

/**
 * Serviço responsável por realizar as ações que devem ser utilizadas pelo usuario
 */
const validations = {
  /**
     * Metodo responsável por verificar se o email é valido levando em consideração:
     *  1 - Se nao veio email;
     *  2 - Se o email é menor que 6 caracteres
     *  3 - Se o email possui
     *
     * @param email email do usuario
     *
     * @return true caso o email esteja validado | false caso o email esteja invalido
     */
  isEmailValid: (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-z]{2,3})+$/i

    return (email || email.trim().length > 6 || regex.test(email))
  },

  /**
     *
     */
  isPasswordValid: (password) => {
    return (!_.isEmpty(password) || (password && password.trim().length <= 32))
  },

  isPasswordLengthValid: (password) => {
    return !(!password || password.replace(/ /g, '').length > 32 || password.replace(/ /g, '').length < 4)
  },

  /**
     *
     */
  isNameUserValid: (name) => {
    return (name && name.trim().length <= 200 && /[a-z]+/g.test(name))
  },

  isBoolean (bool) {
    if (_.isEmpty(bool)) {
      return false
    }

    if (bool === 'true' || bool === 'false' || bool === '1' || bool === '0') {
      return true
    }

    return false
  },

  /**
   * ================================
   *
   *      VALIDAÇÃO DE DATAS
   *
   * ================================
   */

  /**
   * verificando se é uma data valida para o banco de
   * dados
   *
   * vode pode passsar um aray de datas ou não
    *
  */
  date (d) {
    if (d instanceof Array) {
      _.forEach(d, (date) => {
        if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
          return false
        }
      })
    } else if (!moment(d, 'YYYY-MM-DD', true).isValid()) {
      return false
    }
    return true
  },
  /**
   * verificando se é uma data valida para o banco de
   * dados, no caso timestamps
   *
   */
  datetime (d) {
    return moment(d, 'YYYY-MM-DD HH:mm:ss', true).isValid()
  },

  time (d) {
    return moment(d, 'HH:mm:ss', true).isValid()
  },
  /**
   * valida duas datas e entre elas,
   * ou seja, se a data inicial e menor
   * que a final
   */
  dateBefore (start, end) {
    return moment(start).isBefore(end)
  },
  /**
   * ================================
   *
   *      VALIDAÇÃO DE UNDEFINED
   *
   * ================================
   */
  undefined (d) {
    if (d instanceof Array) {
      _.forEach(d, (data) => {
        if (_.isUndefined(data)) {
          return true
        }
      })
    } else if (!moment(d, 'YYYY-MM-DD', true).isValid()) {
      if (_.isUndefined(d)) {
        return true
      }
    }
    return false
  },
  /**
   * ================================
   *
   *      VALIDAÇÃO DE NUMBER PAGINATE
   *
   * ================================
   */

  /**
   *
   * is number valid, better 0 and number same
   *
   * possible pass the array of the number or only namber by function
   *
   */
  pagination (n) {
    if (n instanceof Array) { // verify is array of the numbers for test
      _.forEach(n, (num) => {
        if (!_.isInteger(num) || num.match(/^-\d+$/)) {
          return false
        }
      })
    } else if (!_.isInteger(n) || n.match(/^-\d+$/)) { // case only one number
      return false
    }
    return true
  },
  /**
   * ================================
   *
   *      VALIDAÇÃO DE NUMBER
   *
   * ================================
   */

  /**
   *
   * test if is number valid
   *
   * Is possible pass the array of the number or only namber by function
   *
   */
  number (n) {
    if (n instanceof Array) { // verify is array of the numbers for test
      if (n.some(num => !_.isInteger(num))) {
        return false
      }
    } else if (!this.isInteger(n)) { // case only one number
      return false
    } else if (_.isString(n)) {
      return !_.isNaN(_.toNumber(n))
    }
    return true
  },
  /**
   *
   * check the value if number or float
   *
   * you can pass array of the number or one number
   */
  floatOrNumber (n) {
    if (_.isEmpty(n)) {
      return false
    }

    if (n instanceof Array) {
      if (n.some(num => _.isNaN(_.toNumber(num)))) {
        return false
      }
    } else if (_.isString(n)) {
      return !_.isNaN(_.toNumber(n))
    } else if (!_.isNumber(n)) {
      return false
    }
    return true
  },
  /**
   * ================================
   *
   *      VALIDAÇÃO DE OBJECT
   *
   * ================================
   */

  /**
   *
   * check if is object valid
   *
   * Is possible pass the array of the objects or only object by function
   *
   */
  object (o) {
    if (o instanceof Array) { // verify is array of the numbers for test
      _.forEach(o, (obj) => {
        if (!_.isObject(obj)) {
          return false
        }
      })
    } else if (!_.isObject(o)) { // case only one number
      return false
    }
    return true
  },

  isStringBetweenLength (obj, min, max) {
    if (obj === undefined || obj == null) {
      return (min < 1)
    }

    const len = String(obj).length
    return (len >= min && len <= max)
  },

  isOnlyDigits (obj) {
    if (_.isEmpty(obj)) {
      return false
    }
    return (obj.match(/^[0-9]+$/) != null)
  },

  /**
   * Este metodo tem a responsabilidade de verificar os valores nulos passados,
   * Caso haja algum valor nulo o metodo retornará o caminho da validação do primeiro
   * campo que não pode ser nulo
   *
   * @param values array de objetos a serem validados
   * @param pathTranslate caminho do arquivo de tradução
   *
   * Exemplo: {idSector: null}, 'sector.validation' return sector.validation.idSector
   *
   * @return o retorno será o caminho da tradução passado com o nome do campo passado
   */
  formatTranslateError (values, pathTranslate) {
    let msg = ''

    _.forEach(values, (value, key) => {
      if (_.isNull(value) || value === ' ' || _.isUndefined(value) || value === '') {
        msg = `${pathTranslate}.${key}Required`

        return false
      }
    })

    return msg
  },

  dateAfter (start, end) {
    return moment(start).isAfter(end)
  },

  /**
   * Verifica se as datas são iguais
   * @param {String} date1
   * @param {String} date2
   */
  isDateEqual (date1, date2) {
    return moment(date1).isSame(date2)
  }
}

export default validations
