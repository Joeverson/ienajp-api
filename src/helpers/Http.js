import axios from 'axios';
import store from './Store'
import Vue from 'vue';
import VueAxios from 'vue-axios';
import errorInterceptor from './dispacheRouter/middleware'

const service = axios.create({
  baseURL: "http://10.0.60.142:3004/api/v1",
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + store.token
  }
});

/**
 *
 * middleware for response in the server, its verify tha autancity of the token
 * that tha API analized
 *
 */

service.interceptors.response.use(response => response, (e) => {
  errorInterceptor.dispatch(e.response);
  return e;
});

Vue.use(VueAxios, service);

export default service;
