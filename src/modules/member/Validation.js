import _ from 'lodash'
import ValidationException from '../../exceptions/ValidationException'

export default {
  NoEmpty: (data, key) => {
    if (_.isEmpty(data)) {
      throw new ValidationException(0, `Campo ${key} do membro está vazio, preencha por favor.`)
    }
  }
}
