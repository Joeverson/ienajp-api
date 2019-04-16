import crypto from 'crypto'
import moment from 'moment'
import _ from 'lodash'

const DECODING = {
  '%23': '#',
  '%26': '&',
  '%25': '%'
}

/**
 * modulo de utilitarios genericos para o sistema
 */
export default {
  /**
     * Metodo responsável por retornar uma rota especifica passada pelo cliente
     *
     *
     * @param path rota completa
     *
     * Ex: /api/v1/client/:id/products | Retornando: client/:id/products
     */
  specificRoute: path => (path.split('/').splice(3, path.length - 1).join('/')),

  /**
     * Metodo responsável por retornar o password encriptado
     *
     * @param password em texto plano
     *
     * @returns String password encriptado
     */
  getPasswordEncrypted (password) {
    return (crypto.createHash('md5').update(password).digest('hex'))
  },

  /**
   * Format date TO sql "2018-06-29T03:00:00.000Z" DD/MM/YYYY
   * @param {String} date - date
   * @returns {Date} formatted date
   */
  isDateValid (date) {
    const d = moment(date)
    return d.isValid()
  },

  /**
   * Format date TO sql "2018-06-29T03:00:00.000Z" -> YYYY-MM-DD
   * @param {String} date - date
   * @returns {Date} formatted date
   */
  getDateSqlToDateTime (date) {
    return moment(date).format('YYYY-MM-DD')
  },

  isEmpty (obj) {
    if (obj === undefined || obj === null || obj === '') {
      return true
    }
    return false
  },

  /**
   * check if the time is valid
   * Ex: 12:00 true / 122:00 false
   * @param hour
   * @param format Ex: 'HH:mm' ou 'HH:mm:ss'
   */
  isHourValid (hour, format = 'HH:mm:ss') {
    return moment(hour, format, true).isValid()
  },

  /**
   * check if the timeStamp is valid
   * @param timeStamp
   */
  isTimeStampValid (timeStamp) {
    return moment(timeStamp).isValid()
  },

  getStrToDate (str) {
    return moment(str).format('YYYY-MM-DD')
  },

  /*
   * Metodo responsável por retornar um valor valido
   * para as consultas de filtragem no banco.
   *
   * @param word em texto com caracteres especiais codificados
   *
   * @returns String word encriptado
   */
  decodeValue (word) {
    let value = decodeURI(word)

    _.forEach(DECODING, (decode, k) => {
      value = value.split(k).join(decode)
    })

    return value
  },

  /*
   * Método responsável por gerar um valor em string com zeros à esquerda.
   * Parâmetro (value) é o valor encontrado ao final do resultado junto aos zeros.
   * Parâmetro (length) é o valor do comprimento total que o resultado deve ter.
   *
   * @param {String} value
   * @param {int} length
   */
  generateValueWithZeros (value, length) {
    if (!value) return null

    const valueLength = String(value).length

    if (valueLength >= length) return value

    const base = new Array((length - valueLength) + 1).join('0')
    return base + value
  }
}
