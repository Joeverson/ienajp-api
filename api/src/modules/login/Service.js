import FacadeUser from '../user/Facade';
import log from '../../utils/logger';
import FacadeException from '../../exceptions/FacadeException';
import _ from '../../utils/validations';
import auth from '../../utils/auth';


export default {
  async loginSystem(email, encryptedPassword) {
    log.info('[login] - [/POST] HTTP Request :: loginSystem');

    if (_.isEmpty(email)) {
      throw new FacadeException(2, 'user.error.emailInvalid');
    }

    if (_.isEmpty(encryptedPassword)) {
      throw new FacadeException(2, 'user.error.passwordRequired');
    }

    const user = await FacadeUser.getByEmailAndPassword(email, encryptedPassword);

    if (_.isEmpty(user) || _.isEmpty(user[0]) || _.isEmpty(user[0].id)) {
      throw new FacadeException(2, 'login.error.notLoggedIn');
    }

    if (user[0].blocked) {
      throw new FacadeException(2, 'login.error.userBlocked');
    }

    user[0].token = auth.generateToken(user[0].id);

    return user[0];
  }
};
