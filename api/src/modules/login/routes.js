import Express from 'express';
import Context from '../../utils/context';
import Login from '../login/Service';

const App = Express.Router();

App.route('/')
  .post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const context = new Context();
    context.status = { error: 'login.error.notLoggedIn' };

    try {
      context.data = await Login.loginSystem(email, password);
      context.status = {
        success: 'login.signIn.success'
      };
      context.token = context.data.token;
    } catch (err) {      
      context.status = {
        details: err,
        error: err.message
      };      
    } finally {
      res.send(context);
    }
  });

export default App;
