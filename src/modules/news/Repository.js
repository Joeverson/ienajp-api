
import News from './Model'

export default {
  async create (data) {
    // criando o News
    return {
      data: await News.create(data)
    }
  },

  /**
   * find all users
   */
  async all () {
    return {
      data: await News.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById (id) {
    return {
      data: await News.findById(id)
    }
  },

  /**
   * atualizando com base no id
   * @param {Int} id
   * @param {Object} data
   */
  async update (id, data) {
    return {
      data: await News.updateOne({
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
      data: await News.deleteOne({
        _id: id
      })
    }
  }
}
