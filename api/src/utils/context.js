/**
 * 
 * the script is used in conversation into back-end and front-end
 * it's one pattern of the conversation of the aplications.
 * 
 * 
 */

export default class Context {
  constructor(obj) {
    return Object.assign({
      data: [],
      status: {},
      token: {}
    }, obj);
  }
}
