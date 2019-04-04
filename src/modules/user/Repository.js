import User from './Model'
import {
  Utils
} from '../../utils'
import UserValidation from './Validation'

export default {
  async create(data, callback) {
    // validações
    await UserValidation.passwordValid(data.password)
    await UserValidation.nameValid(data.name)
    await UserValidation.existsUser(data.name, data.password)

    // modificação de dados
    data.password = Utils.getPasswordEncrypted(data.password)
    data.active = true

    // criando o user
    return {
      data: await User.create(data)
    }
  },

  /**
   * find all users
   */
  async all() {
    return {
      data: await User.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById(id) {
    return {
      data: await User.findById(id)
    }
  },

  async update(id, data) {
    return {
      data: await User.updateOne({_id:id}, data)
    }
  }
}