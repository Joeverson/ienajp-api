import SchemaSwagger from '../../swagger/schemaSwagger'

const exampleToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.
yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw`

export const tag = {
  name: 'login',
  description: 'Operations about login'
}

// MODELS
export const Login = {
  type: 'object',
  required: [
    'email',
    'encryptedPassword'
  ],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minimum: 1,
      maxLength: 150
    },
    encryptedPassword: {
      type: 'string',
      format: 'password',
      description: 'You must encrypt with md5 to send'
    }
  }
}

export const LoginReturned = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      minimum: 1
    },
    name: {
      type: 'string',
      minimum: 1,
      maxLength: 200
    },
    email: {
      type: 'string',
      format: 'email',
      minimum: 1,
      maxLength: 150
    },
    blocked: {
      type: 'boolean'
    },
    id_access_profile: {
      type: 'integer',
      minimum: 1
    },
    matriculation: {
      type: 'string',
      minimum: 1,
      maxLength: 10
    },
    token: {
      type: 'string',
      example: exampleToken
    }
  }
}
// FIM DOS MODELS

// ROTA RAIZ
export const routeRoot = {
  post: {
    security: [
      {}
    ],
    summary: 'Log in',
    description: 'Log in',
    parameters: [
      {
        in: 'body',
        name: 'body',
        description: '',
        required: true,
        schema: {
          $ref: '#/definitions/Login'
        }
      }
    ],
    tags: [tag.name],
    produces: [
      'application/json'
    ],
    responses: {
      200: {
        description: '',
        schema: (new SchemaSwagger({
          type: 'object',
          $ref: '#/definitions/LoginReturned'
        }, {
          success: {
            type: 'string',
            example: 'login.signIn.success'
          }
        }, exampleToken)).schema
      }
    }
  }
}
