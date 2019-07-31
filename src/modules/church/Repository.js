
import Church from './Model'

export default {
  async create (data) {
    // criando o Church
    return {
      data: await Church.create(data)
    }
  },

  /**
   * find all users
   */
  async all () {
    return {
      data: await Church.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById (id) {
    return {
      data: await Church.findById(id)
    }
  },

  /**
   * atualizando com base no id
   * @param {Int} id
   * @param {Object} data
   */
  async update (id, data) {
    return {
      data: await Church.updateOne({
        _id: id
      }, data)
    }
  },

  /**
   * Deletando por id
   * @param {Int} id
   */
  async delete (id) {
    return {
      data: await Church.deleteOne({
        _id: id
      })
    }
  }
}
