import pjson from '../../package.json'
import * as UserSwagger from '../../src/modules/user/swagger'
import * as LoginSwagger from '../../src/modules/login/swagger'

module.exports = {
  swagger: '2.0',
  info: {
    description: 'Descrição',
    version: pjson.version,
    title: 'API Advansat'
  },
  host: `${process.env.API_HOST}:${process.env.API_PORT}`,
  basePath: '/api/v1',
  tags: [
    LoginSwagger.tag,
    UserSwagger.tagUser
  ],
  schemes: [
    'http'
  ],
  paths: {
    '/login': LoginSwagger.routeRoot,
    '/user': UserSwagger.routeRootUser,
    '/user/{id}': UserSwagger.routeByIDUser
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    {
      Bearer: []
    }
  ],
  definitions: {
    Login: LoginSwagger.Login,
    LoginReturned: LoginSwagger.LoginReturned,
    User: UserSwagger.User,
    NewUser: UserSwagger.NewUser,
    UpdateUser: UserSwagger.UpdateUser
  }
}
