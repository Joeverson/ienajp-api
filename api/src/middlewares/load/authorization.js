import jwt from 'jsonwebtoken';
import utils from '../../utils/utils';

export default (request, response, next) => {
  const ignoreRoute = new Set(['login', 'pocket/checkin', 'docs']);
  const specificRoute = utils.specificRoute(request.path);

  if (!ignoreRoute.has(specificRoute)) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).send({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ');
    
    if (parts.length !== 2) {
      return response.status(401).send({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return response.status(401).send({ error: 'Token malformatted' });
    }

    const secretKey = process.env.SECRET_KEY_TOKEN;

    try {
      request.idUser = jwt.verify(token, secretKey).id;
    } catch (error) {
      return response.status(401).send({ error: 'Token invalid' });
    }
  }

  next();
};
