import User from '../user/Service';
import LoginValidations from './Validation';
import validations from '../../utils/validations';
import utils from '../../utils/utils';
import auth from '../../utils/auth';


export default {
  async loginSystem(email, password) {
    LoginValidations.emailValid(email)
    LoginValidations.passwordValid(password)
    
    password = await utils.getPasswordEncrypted(password);

    const user = await User.find({ email, password });
        
    if (validations.isEmpty(user) || validations.isEmpty(user[0]) || validations.isEmpty(user[0].id)) {
      throw 'login.error.notLoggedIn';
    }
    

    user[0].token = auth.generateToken(user[0].id);

    return user[0];
  }
};
