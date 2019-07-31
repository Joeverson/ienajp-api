import Database from '../../../config/database'
import { USER_TYPES } from '../../utils/constants'

const schema = new Database.Schema({
  name: String,
  address: String,
  birthday: Date,
  phone: String,
  userType: {
    type: String,
    enum: [...USER_TYPES]
  },
  consolidation: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Consolidation'
  },
  cell: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Cell'
  },
  supervidor: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Member'
  },
  igreja: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Church'
  }
})

const autoPopulated = function (next) {
  this.populate('consolidation')
  this.populate('cell')
  this.populate('supervidor')
  this.populate('church')
  next()
}

schema.pre('find', autoPopulated).pre('findById', autoPopulated)

export default Database.model('Member', schema)
