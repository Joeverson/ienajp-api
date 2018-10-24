import Express from 'express';
import logger from '../../utils/logger';
import Context from '../../utils/context';
import User from './User';
import FacadeUser from './Facade';
import FacadeException from '../../exceptions/FacadeException';

const App = Express.Router();

App.route('/')
  .get(async (req, res) => {
    const context = new Context();

    try {
      const params = {
        pagePos: req.query.pagePos,
        pageSize: req.query.pageSize,
        filter: req.query.filter,
        order: req.query.order,
        orderBy: req.query.orderBy
      };
      
      context.data = await FacadeUser.delegateFilter(params);
      context.count = await FacadeUser.countCustom(params.filter || null);
    } catch (err) {
      if (err instanceof FacadeException) {
        context.status = {
          errorCode: err.code,
          error: err.message
        };
      } else {
        context.status = {
          errorCode: '0',
          error: 'error.errorUnexcepted'
        };
        logger.error(err);
      }
    } finally {
      res.send(context);
    }
  })
  .post(async (req, res) => {
    const context = new Context();
    try {
      const user = new User(
        null, req.body.idOccupation, req.body.name, req.body.email,
        req.body.password, req.idUser, null, null, null,
        req.body.idAccessProfile, req.body.idArea, req.body.blocked,
        req.body.matriculation
      );
      
      context.data = await FacadeUser.insert(user);
      context.status = {
        success: 'user.create.success'
      };
      res.send(context);
    } catch (err) {
      if (err instanceof FacadeException) {
        context.status = {
          errorCode: err.code,
          error: err.message
        };
      } else {
        context.status = {
          errorCode: '0',
          error: 'error.errorUnexcepted'
        };
        logger.error(err);
      }
      res.send(context);
    }
  });

App.route('/:id')
  .get(async (req, res) => {
    const context = new Context();

    try {
      context.data = await FacadeUser.find(req.params.id);
      res.send(context);
    } catch (err) {
      if (err instanceof FacadeException) {
        context.status = {
          errorCode: err.code,
          error: err.message
        };
      } else {
        context.status = {
          errorCode: '0',
          error: 'error.errorUnexcepted'
        };
        logger.error(err);
      }
      res.send(context);
    }
  })
  .put(async (req, res) => {
    const context = new Context();

    try {
      const user = new User(
        req.params.id, req.body.idOccupation, req.body.name, req.body.email,
        req.body.password, null, null, req.idUser, 'now()',
        req.body.idAccessProfile, req.body.idArea, req.body.blocked,
        req.body.matriculation
      );

      context.data = await FacadeUser.update(user);
      context.status = {
        success: 'user.edit.success'
      };
      res.send(context);
    } catch (err) {
      if (err instanceof FacadeException) {
        context.status = {
          errorCode: err.code,
          error: err.message
        };
      } else {
        context.status = {
          errorCode: '0',
          error: 'error.errorUnexcepted'
        };
        logger.error(err);
      }
      res.send(context);
    }
  })
  .delete(async (req, res) => {
    const context = new Context();

    try {
      context.data = await FacadeUser.delete(req.params.id);
      context.status = { success: 'user.delete.success' };
    } catch (err) {
      if (err instanceof FacadeException) {
        context.status = {
          errorCode: err.code,
          error: err.message
        };
      } else {
        context.status = {
          errorCode: '0',
          error: 'user.error.notPossibleDelete'
        };
        logger.error(err);
      }
    } finally {
      res.send(context);
    }
  });

export default App;
