
import Express from 'express'
import {
  Context
} from '../../utils'
import Repository from './Repository'
import Messages from '../../utils/Messages'

const App = Express.Router()

/**
 * -------------------------------
 * routes API /cell
 * --------------------------------
 * * */
App.route('/')
  .get((req, res) => {
    const context = new Context(res)

    Repository.all()
      .then(data => {
        context.success(data, Messages.cell.success.list)
      })
      .catch(err => {
        context.error(err)
      })
  })
  .post((req, res) => {
    const context = new Context(res)

    Repository.create(req.body)
      .then(data => {
        context.success(data, Messages.cell.success.create)
      })
      .catch(err => {
        context.error(err.message)
      })
  })

App.route('/:id')
  .get((req, res) => {
    const context = new Context(res)

    Repository.findById(req.params.id)
      .then(data => {
        context.success(data)
      })
      .catch(err => {
        context.error(err)
      })
  })
  .put((req, res) => {
    const context = new Context(res)

    Repository.update(req.params.id, req.body)
      .then(data => {
        context.success(data, Messages.cell.success.edit)
      })
      .catch(err => {
        context.error(err)
      })
  })
  .delete((req, res) => {
    const context = new Context(res)

    Repository.delete(req.params.id)
      .then(data => {
        context.success(data, Messages.cell.success.delete)
      })
      .catch(err => {
        context.error(err)
      })
  })

export default App
