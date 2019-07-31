
import Consolidation from './Model'

export default {
  async create (data) {
    // criando o Consolidation
    return {
      data: await Consolidation.create(data)
    }
  },

  /**
   * find all users
   */
  async all () {
    return {
      data: await Consolidation.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById (id) {
    return {
      data: await Consolidation.findById(id)
    }
  },

  /**
   * atualizando com base no id
   * @param {Int} id
   * @param {Object} data
   */
  async update (id, data) {
    return {
      data: await Consolidation.updateOne({
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
      data: await Consolidation.deleteOne({
        _id: id
      })
    }
  }
}
