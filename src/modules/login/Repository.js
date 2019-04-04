import User from '../user/Model';
import LoginValidations from './Validation';
import validations from '../../utils/validations';
import {
  Auth,
  Utils
} from '../../utils';
// import utils from '../../utils/utils';


export default {
  async loginSystem(name, password) {
    await LoginValidations.passwordValid(password)
    
    password = await Utils.getPasswordEncrypted(password);

    const user = await User.find({ name, password: { $gte: password} }, 'name active');
        
    if (validations.isEmpty(user) || validations.isEmpty(user[0]) || validations.isEmpty(user[0].id)) {
      throw 'login.error.notLoggedIn';
    }
    

    return {
      token: Auth.generateToken(user[0].id),
      data: user[0]
    };
  }
}

