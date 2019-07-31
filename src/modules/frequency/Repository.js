
import Frequency from './Model'

export default {
  async create (data) {
    // criando o Frequency
    return {
      data: await Frequency.create(data)
    }
  },

  /**
   * find all users
   */
  async all () {
    return {
      data: await Frequency.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById (id) {
    return {
      data: await Frequency.findById(id)
    }
  },

  /**
   * atualizando com base no id
   * @param {Int} id
   * @param {Object} data
   */
  async update (id, data) {
    return {
      data: await Frequency.updateOne({
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
      data: await Frequency.deleteOne({
        _id: id
      })
    }
  }
}
