import User from '../user/Model'
import LoginValidations from './Validation'
import _ from 'lodash'
import {
  Auth,
  Utils
} from '../../utils'
// import utils from '../../utils/utils';

export default {
  async loginSystem (name, password) {
    await LoginValidations.passwordValid(password)

    password = await Utils.getPasswordEncrypted(password)

    const user = await User.find({ name, password: { $gte: password } }, 'name active')

    if (_.isEmpty(user)) {
      throw 'login.error.notLoggedIn' // eslint-disable-line
    }

    return {
      token: Auth.generateToken(user[0].id),
      data: user[0]
    }
  }
}
