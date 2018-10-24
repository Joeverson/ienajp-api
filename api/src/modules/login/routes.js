import Express from 'express';
import Context from '../../utils/context';
import FacadeLogin from '../login/Facade';
import FacadeException from '../../exceptions/FacadeException';
import log from '../../utils/logger';

const App = Express.Router();

App.route('/')
  .post(async (req, res) => {
    const email = req.body.email;
    const encryptedPassword = req.body.encryptedPassword;

    const context = new Context();
    context.status = { error: 'login.error.notLoggedIn' };

    try {
      context.data = await FacadeLogin.loginSystem(email, encryptedPassword);
      context.status = {
        success: 'login.signIn.success'
      };
      context.token = context.data.token;
      res.send(context);
    } catch (err) {
      if (err instanceof FacadeException) {
        context.status = {
          details: err,
          error: err.message
        };
      } else {
        context.status = {
          details: '0',
          error: 'error.errorUnexcepted'
        };
        log.error(err);
      }
      res.send(context);
    }
  });

export default App;
