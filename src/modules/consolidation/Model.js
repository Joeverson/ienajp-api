import Database from '../../../config/database'
import { CONSOLIDATIONS } from '../../utils/constants'

const schema = new Database.Schema({
  date: Date,
  consolidation: {
    type: String,
    enum: [...CONSOLIDATIONS],
    leader: {
      type: Database.Schema.Types.ObjectId,
      ref: 'Member'
    },
    cell: {
      type: Database.Schema.Types.ObjectId,
      ref: 'Cell'
    }
  }
})

export default Database.model('Consolidation', schema)
