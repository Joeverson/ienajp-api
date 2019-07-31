import Database from '../../../config/database'

const schema = new Database.Schema({
  name: String,
  logo: String,
  leader: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Member'
  },
  church: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Church'
  }
})

const autoPopulated = function (next) {
  this.populate('leader')
  this.populate('church')
  next()
}

schema.pre('find', autoPopulated).pre('findById', autoPopulated)

export default Database.model('Networking', schema)
