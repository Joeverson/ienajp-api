import Database from '../../../config/database'

const schema = new Database.Schema({
  name: String,
  address: String,
  time: String,
  birthday: Date,
  logo: String,
  leader: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Member'
  },
  networking: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Networking'
  }
})

const autoPopulated = function (next) {
  this.populate('leader')
  this.populate('networking')
  next()
}

schema.pre('find', autoPopulated).pre('findById', autoPopulated)

export default Database.model('Cell', schema)
