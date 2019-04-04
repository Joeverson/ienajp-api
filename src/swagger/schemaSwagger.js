export default class SchemaSwagger {
  constructor(_value = {}, propertiesStatus = {}, token = '') {
    this.schema = {
      type: 'object',
      properties: {
        data: _value,
        status: {
          type: 'object',
          description: 'Action result message',
          nullable: true,
          properties: propertiesStatus
        },
        token: {
          type: 'string',
          description: 'Token is generate in jwt',
          example: token,
          nullable: true
        }
      }
    };
  }
}
