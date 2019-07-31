
import Networking from './Model'

export default {
  async create (data) {
    // criando o Networking
    return {
      data: await Networking.create(data)
    }
  },

  /**
   * find all users
   */
  async all () {
    return {
      data: await Networking.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById (id) {
    return {
      data: await Networking.findById(id)
    }
  },

  /**
   * atualizando com base no id
   * @param {Int} id
   * @param {Object} data
   */
  async update (id, data) {
    return {
      data: await Networking.updateOne({
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
      data: await Networking.deleteOne({
        _id: id
      })
    }
  }
}
