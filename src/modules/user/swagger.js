import SchemaSwagger from '../../swagger/schemaSwagger'

const messageCreate = 'user.create.success'
const messageUpdate = 'user.edit.success'
const messageDelete = 'user.delete.success'
const schemaObject = {
  type: 'object',
  $ref: '#/definitions/User'
}

export const tagUser = {
  name: 'user',
  description: 'Operações sobre usuário'
}

// MODELS
export const User = {
  type: 'object',
  required: [
    'id',
    'name',
    'password',
    'active'
  ],
  properties: {
    id: {
      type: 'integer',
      minimum: 1
    },
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    active: {
      type: 'boolean'
    }
  }
}

export const NewUser = {
  type: 'object',
  required: [
    'name',
    'password',
    'active'
  ],
  properties: {
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    active: {
      type: 'boolean'
    }
  }
}

export const UpdateUser = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    active: {
      type: 'boolean'
    }
  }
}

// FIM DOS MODELS

// ROTA RAIZ
export const routeRootUser = {
  get: {
    summary: 'Retorna a lista de usuário',
    description: 'Listando todos os usuarios do sistema',
    parameters: [],
    tags: ['user'],
    produces: [
      'application/json'
    ],
    responses: {
      200: {
        description: '',
        schema: (new SchemaSwagger({
          type: 'array',
          items: {
            $ref: '#/definitions/User'
          }
        })).schema
      }
    }
  },
  post: {
    summary: 'Add a new User',
    description: '',
    parameters: [
      {
        in: 'body',
        name: 'body',
        description: '',
        required: true,
        schema: {
          $ref: '#/definitions/NewUser'
        }
      }
    ],
    tags: ['user'],
    produces: [
      'application/json'
    ],
    responses: {
      200: {
        description: messageCreate,
        schema: (new SchemaSwagger(schemaObject, {
          success: {
            type: 'string',
            example: messageCreate
          }
        })).schema
      }
    }
  }
}

// ROTAS COM PARAMETRO ID
export const routeByIDUser = {
  get: {
    summary: 'Return the user by ID',
    description: '',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of user',
        type: 'integer',
        required: true
      }
    ],
    tags: ['user'],
    produces: [
      'application/json'
    ],
    responses: {
      200: {
        description: '',
        schema: (new SchemaSwagger(schemaObject)).schema
      }
    }
  },
  put: {
    summary: 'Update the User by ID',
    description: '',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of User',
        type: 'integer',
        required: true
      },
      {
        in: 'body',
        name: 'body',
        description: '',
        required: true,
        schema: {
          $ref: '#/definitions/UpdateUser'
        }
      }
    ],
    tags: ['user'],
    produces: [
      'application/json'
    ],
    responses: {
      200: {
        description: messageUpdate,
        schema: (new SchemaSwagger(schemaObject, {
          success: {
            type: 'string',
            example: messageUpdate
          }
        })).schema
      }
    }
  },
  delete: {
    summary: 'Delete the user by ID',
    description: '',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of user',
        type: 'integer',
        required: true
      }
    ],
    tags: ['user'],
    produces: [
      'application/json'
    ],
    responses: {
      200: {
        description: messageDelete,
        schema: (new SchemaSwagger(schemaObject, {
          success: {
            type: 'string',
            example: messageDelete
          }
        })).schema
      }
    }
  }
}
