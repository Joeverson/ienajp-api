import winston from 'winston'
import moment from 'moment'

/**
 *
 * the scrit by logger erros in system
 *
 *
 */
const tsFormat = () => moment().format('DD-MM-YYYY HH:mm:ss').trim()

export default new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: tsFormat
    }),
    new (winston.transports.File)({
      name: 'erros',
      filename: 'errors.log',
      level: 'error'
    })
  ]
})
