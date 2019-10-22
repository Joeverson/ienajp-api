import mongoose from 'mongoose'
import logger from '../src/utils/logger'
const DB_URI = `${process.env.DB_HOST}/${process.env.DB_NAME}`

/**
 * Init database connection
 *
 * @returns {undefined}
 */
export default (() => {
  const options = {
    autoIndex: false, // Don't build indexes
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    autoReconnect: true,
    useNewUrlParser: true
  }
  mongoose.connect(
    DB_URI,
    options
  )
  mongoose.connection.on('disconnected', () =>
    logger.error('Mongoose disconnected')
  )
  mongoose.connection.on('error', err => {
    logger.error(`Mongoose connection error: ${err}`)
    mongoose.disconnect()
  })

  // if the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.warn('Mongoose disconnected by user termination')
      process.exit(1)
    })
  })

  return mongoose
})()
