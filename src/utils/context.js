import logger from "./logger";

/**
 * 
 * the script is used in conversation into back-end and front-end
 * it's one pattern of the conversation of the aplications.
 * 
 * 
 */

export default class Context {
  constructor(response) {
    this.ctx = {
      data: [],
      status: {
        success: false
      }
    }
    this.response = response
  }

  // caso seja informações de sucessso
  success(data, message) {
    this.ctx.status.success = true
    this.ctx.status.message = message
    this.ctx = {...this.ctx, ...data}
    
    this.response.status(200).send(this.ctx)
  }

  // caso seja informações de sucessso
  error(message) {
    this.ctx.status.success = false
    this.ctx.status.message = message

    logger.error(message)

    this.response.status(200).send(this.ctx)
  }
}
