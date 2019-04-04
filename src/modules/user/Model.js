
import Database from '../../../config/database'

const schema = new Database.Schema({
  name: String,
  password: String,
  active: Boolean
});

export default Database.model('User', schema);
