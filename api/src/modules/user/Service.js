import model from '../../db/models';
import utils from '../../utils/utils';
import UserValidation from './Validation';
import validations from '../../utils/validations';


class User {
  constructor() {
    this.User = model.User
  }

  async insert(user) {
    console.log(user);
    
    UserValidation.emailValid(user.email);
    UserValidation.passwordValid(user.password);
    UserValidation.nameValid(user.name);

    user.password = await utils.getPasswordEncrypted(user.password);
    const res = await this.User.create(user);

    return res;
  }

  async update(user) {
    await UserValidation.idValid(user.id);
    UserValidation.userTypeValid(user.userType);
    await UserValidation.emailValid(user.email);
    UserValidation.passwordValid(user.password);
    UserValidation.nameValid(user.name);
    
    if (user.password) {
      user.password = await utils.getPasswordEncrypted(user.password);
    }

    const res = await this.User.update(user, {
      returning: true,
      where: user.id
    });
    
    return res;
  }

  async delete(id) {
    await validations.idValid(id)

    const res = await this.User.destroy({
      returning: true,
      where: {
        id
      }
    });

    return res;
  }

  /**
   * 
   * exists the user, passing the u_id
   * 
   */
  async byId(id) {
    validations.isInteger(id)

    const user = await this.User.findById(id);
    
    if (user) {
      user.password = null;
    }

    return user;
  }

  /**
   * 
   * exists the user, passing the u_id
   * 
   */
  async find(data) {
    const user = await this.User.findAll({ where: data });
   
    return user;
  }

  /**
   * listando todos os usuarios da base
   */
  async all() {
    const users = await this.User.all();

    return users;
  }
}

export default new User();