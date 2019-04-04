import SchemaSwagger from '../../swagger/schemaSwagger';

const messageCreate = 'user.create.success';
const messageUpdate = 'user.edit.success';
const messageDelete = 'user.delete.success';
const schemaObject = {
  type: 'object',
  $ref: '#/definitions/User'
};

export const tagUser = {
  name: 'user',
  description: 'Operations about user'
};

// MODELS
export const User = {
  type: 'object',
  required: [
    'id',
    'idOccupation',
    'name',
    'email',
    'password',
    'idUserCreated',
    'momentCreated',
    'idUserChanged',
    'momentChanged',
    'idAccessProfile',
    'idArea',
    'blocked',
    'matriculation'
  ],
  properties: {
    id: {
      type: 'integer',
      minimum: 1
    },
    idOccupation: {
      type: 'integer',
      minimum: 1
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string'
    },
    id_user_created: {
      type: 'integer',
      minimum: 1
    },
    id_user_changed: {
      type: 'integer',
      minimum: 1
    },
    moment_created: {
      type: 'string',
      format: 'date-time'
    },
    moment_changed: {
      type: 'string',
      format: 'date-time'
    },
    idAccessProfile: {
      type: 'integer',
      minimum: 1
    },
    idArea: {
      type: 'integer',
      minimum: 1
    },
    blocked: {
      type: 'boolean'
    },
    matriculation: {
      type: 'string'
    }
  }
};

export const NewUser = {
  type: 'object',
  required: [
    'idOccupation',
    'name',
    'email',
    'password',
    'idAccessProfile',
    'idArea',
    'blocked',
    'matriculation'
  ],
  properties: {
    idOccupation: {
      type: 'integer',
      minimum: 1
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      nullable: true,
      example: 'null'
    },
    idAccessProfile: {
      type: 'integer',
      minimum: 1
    },
    idArea: {
      type: 'integer',
      minimum: 1
    },
    blocked: {
      type: 'boolean'
    },
    matriculation: {
      type: 'string'
    }
  }
};

export const UpdateUser = {
  type: 'object',
  properties: {
    idOccupation: {
      type: 'integer',
      minimum: 1
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string'
    },
    idAccessProfile: {
      type: 'integer',
      minimum: 1
    },
    idArea: {
      type: 'integer',
      minimum: 1
    },
    blocked: {
      type: 'boolean'
    },
    matriculation: {
      type: 'string'
    }
  }
};

// FIM DOS MODELS

// ROTA RAIZ
export const routeRootUser = {
  get: {
    summary: 'Return the full list of User',
    description: '',
    parameters: [
      {
        name: 'pagePos',
        in: 'query',
        description: 'Paging position',
        type: 'integer'
      },
      {
        name: 'pageSize',
        in: 'query',
        description: 'Amount of data returned per page',
        type: 'integer'
      },
      {
        name: 'filter',
        in: 'query',
        description: 'Data for data filtering',
        type: 'string'
      }
    ],
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
};

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
};
