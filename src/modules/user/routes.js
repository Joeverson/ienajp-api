import Express from 'express'
import {
  Context
} from '../../utils'
import Repository from './Repository'

const App = Express.Router()

App.route('/')
  .get(async (req, res) => {
    const context = new Context(res)

    Repository.all()
      .then(data => {
        context.success(data, 'user.list.success')
      })
      .catch(err => {
        context.error(err)
      })
  })
  .post((req, res) => {
    const context = new Context(res)

    Repository.create(req.query || req.body)
      .then(data => {
        context.success(data, 'user.create.success')
      })
      .catch(err => {
        context.error(err.message)
      })
  })

App.route('/:id')
  .get(async (req, res) => {
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

    Repository.update(req.params.id, req.query)
      .then(data => {
        context.success(data, 'user.edit.success')
      })
      .catch(err => {
        context.error(err)
      })
  })
  .delete(async (req, res) => {
    const context = new Context(res)

    Repository.delete(req.params.id)
      .then(data => {
        context.success(data, 'user.delete.success')
      })
      .catch(err => {
        context.error(err)
      })
  })

export default App
