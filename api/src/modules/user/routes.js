import Express from 'express';
import logger from '../../utils/logger';
import Context from '../../utils/context';
import User from './Service';

const App = Express.Router();

App.route('/')
  .get(async (req, res) => {
    const context = new Context();

    try {
      
      context.data = await User.all();
      context.success = {
        success: 'user.list.success'
      }
    } catch (err) {
      context.status = {
        errorCode: err.code,
        error: err.message
      };
      logger.error(err);
    } finally {
      res.send(context);
    }
  })
  .post(async (req, res) => {
    const context = new Context();

    try {
      const user = (req.body || req.query);
      
      context.data = await User.insert(user);
      context.status = {
        success: 'user.create.success'
      };
    } catch (err) {
      context.status = {
        errorCode: err.code,
        error: err.message
      };
      logger.error(err);
    } finally {
      res.send(context);
    }
  });

App.route('/:id')
  .get(async (req, res) => {
    const context = new Context();

    try {
      context.data = await User.byId(req.params.id);
      res.send(context);
    } catch (err) {
      context.status = {
        errorCode: err.code,
        error: err.message
      };
      logger.error(err);
    } finally {
      res.send(context);
    }
  })
  .put(async (req, res) => {
    const context = new Context();

    try {

      context.data = await User.update(req.query);
      context.status = {
        success: 'user.edit.success'
      };
      res.send(context);
    } catch (err) {
      context.status = {
        errorCode: err.code,
        error: err.message
      };
      logger.error(err);
    } finally {
      res.send(context);
    }
  })
  .delete(async (req, res) => {
    const context = new Context();

    try {
      context.data = await User.delete(req.params.id);
      context.status = { success: 'user.delete.success' };
    } catch (err) {
      context.status = {
        errorCode: err.code,
        error: err.message
      };
      logger.error(err);
    } finally {
      res.send(context);
    }
  });

export default App;
