import _ from 'lodash';
import Vue from '../../main';
import states from './states/erros';

/**
 * the lib for auth and controller of the access
 */
export default {
  dispatch(response) {
    if (_.isUndefined(response)) {
      delete localStorage.token;
      Vue.$store.dispatch('logout');
      Vue.$router.push('/');
    } else {
      const index = _.findKey(states, m => m.status === response.status);
      states[index].action();
    }
  }
};
