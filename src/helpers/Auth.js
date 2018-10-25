import _ from 'lodash'
import http from './Http'
import store from './Store'

class Auth {
  /**
   * metodo responsavel por poder
   * fazer login na api, retornando 
   * ou o usuario ou false caso não
   * tenha logado
   * 
   * @param {Data} data 
   */
  async login(data) {
    const user = await http.post('/login', data);
    const token = user.data.token;

    if (_.isEmpty(token)) {
      return false;
    }


    store.setData({
      token,
      user: JSON.stringify(user.data.data)
    });

    window.location.href = '/admin';
    
    return user.data;
  }
  
  /**
   * fazendo logout 
   */
  logout() {
    store.clear()
    window.location.href = '/';
  }

  /**
   * verificando se esta logado ou não
   */
  isLogged() {
    return _.isEmpty(store.token);
  }
}

export default new Auth();