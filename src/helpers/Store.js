class Store {
  constructor() {
    Object.assign(this, localStorage)
  }

  /**
   * pega o objeto passado e injeta o mesmo no
   * localstorage
   * 
   * @param {Object} data 
   */
  setData({...data}) {
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, data[key])
    })
  }

  /**
   * limpando o storage
   */
  clear() {
    localStorage.clear()
  }
}

export default new Store()