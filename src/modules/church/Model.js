import Database from '../../../config/database'

const schema = new Database.Schema({
  name: String,
  leader: {
    type: Database.Schema.Types.ObjectId,
    ref: 'Member'
  }
})

const autoPopulated = function (next) {
  this.populate('leader')
  next()
}

schema.pre('find', autoPopulated).pre('findById', autoPopulated)

export default Database.model('Church', schema)
