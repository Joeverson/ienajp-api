import Database from '../../../config/database'

const schema = new Database.Schema({
  title: String,
  description: String,
  date: Date,
  image: String
})

export default Database.model('News', schema)
