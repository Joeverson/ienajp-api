
import Cell from './Model'

export default {
  async create (data) {
    // criando o Cell
    return {
      data: await Cell.create(data)
    }
  },

  /**
   * find all users
   */
  async all () {
    return {
      data: await Cell.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById (id) {
    return {
      data: await Cell.findById(id)
    }
  },

  /**
   * atualizando com base no id
   * @param {Int} id
   * @param {Object} data
   */
  async update (id, data) {
    return {
      data: await Cell.updateOne({
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
      data: await Cell.deleteOne({
        _id: id
      })
    }
  }
}
