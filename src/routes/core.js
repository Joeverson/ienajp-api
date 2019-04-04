import fs from 'fs';
import _ from 'lodash';
import middleware from '../middlewares/core';
import logger from '../utils/logger';

/*
------------------------
PREFIXO DA API
------------------------
*/
const PREFIX = '/api/v1';

/**
 * função que adapta as rotas para ler se vem na rota composta ou simples
 * ou seja caso o nome do module é '/casaDaVeia' a rota vai ser chamada
 * da seguinte forma '/casa-da-veia' mas tbm ela poderar ser chamada de '/casaDaVeia'.
 * E se for um nome simples como 'casa' não tem o que fazer não kk.
 * 
 */
const adaptiveRouter = (name) => {
  const ignore = [ // array de caracteres que seram ignorados na montagem da string
    '-', '_'
  ];

  const arr = name.split([]);
  const word = [];

  _.forEach(arr, (letter) => {
    // condicionais de ignores
    if (_.indexOf(ignore, letter) === -1) {
      if (letter === letter.toUpperCase()) {
        word.push('-', letter.toLowerCase()); // controlle caso já venha com o '-' no modulo | só controlle de erros
      } else {
        word.push(letter);
      }
    }
  });
  const joined = word.join('');

  return /-/g.test(joined) ? joined : name;
};

/**
 * -------------------------------
 *
 *
 * routes API instances
 *
 *
 * -------------------------------'
 * * */

export default {
  config: (app) => {
    // fazendo um scan nos arquivos de rotas
    fs.readdir(`${__dirname}/../modules`, (er, f) => {
      _.forEach(f, (_module) => {
        fs.readdir(`${__dirname}/../modules/${_module}`, (err, file) => {
          _.forEach(file, (routeName) => {
            if (/routes*\.[A-Za-z]*/.test(routeName)) {
              // make the importation of the routes file
              import(`${__dirname}/../modules/${_module}/${routeName}`).then((routers) => {
                // scan in the middlewares
                middleware.loadMiddleArray(`${__dirname}/../modules/${_module}/middlewares`).then((middle) => {
                  if (_.isEmpty(middle)) {
                    // add the router in instance app express
                    app.use(`${PREFIX}/${adaptiveRouter(_module)}`, routers.default); // forma mais atual com o padrão rest API para as routes
                    app.use(`${PREFIX}/${_module}`, routers.default); // ## esse é a forma antiga de captura e modules=>route, depois remover quando adaptar as routes para nomes compostos como explica a função adaptiveRoute
                  } else {
                    // add the router in instance app express
                    app.use(`${PREFIX}/${adaptiveRouter(_module)}`, middle, routers.default);
                    app.use(`${PREFIX}/${_module}`, middle, routers.default); // ## esse é a forma antiga de captura e modules=>route, depois remover quando adaptar as routes para nomes compostos como explica a função adaptiveRoute
                  }
                }).catch((e) => {
                  logger.error(e);
                });
              }).catch((error) => {
                logger.error(error);
              });
            }
          });
        });
      });
    });
  }
};
