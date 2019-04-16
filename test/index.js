/* eslint-disable */
import logger from '../src/utils/logger'
import * as Constants from './Constants'

import testLogin from './login.spec'
import testUser from './user.spec'


logger.transports.console.silent = true

describe ('Exec Unit tests', () => {
  testLogin()
  testUser()
})
