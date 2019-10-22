
import Member from './Model'
import Validation from './Validation'

export default {
  async create (data) {
    Validation.NoEmpty(data.name)
    Validation.NoEmpty(data.phone)
    Validation.NoEmpty(data.address)

    // criando o Member
    return {
      data: await Member.create(data)
    }
  },

  /**
   * find all users
   */
  async all () {
    return {
      data: await Member.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById (id) {
    return {
      data: await Member.findById(id)
    }
  },

  /**
   * atualizando com base no id
   * @param {Int} id
   * @param {Object} data
   */
  async update (id, data) {
    return {
      data: await Member.updateOne({
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
      data: await Member.deleteOne({
        _id: id
      })
    }
  }
}
