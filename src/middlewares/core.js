import bodyParser from 'body-parser'
import _ from 'lodash'
import fs from 'fs'
import cors from 'cors'

/**
 * -------------------------------
 *
 *
 * CORE MIDDLEWARE's load global
 *
 *
 * -------------------------------
 * * */

const middleware = {
  config: (app) => {
    // parse application/json
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
      extended: false
    }))

    // cors for problem auth browser and cliente
    app.use(cors())

    /**
    * adicionando o midlleware para a plicação como um todo
    * ela vai ser interpretada por tadas as rotas que forem solicitadas
    *
    * add all routes for API restful
    */

    middleware.loadMiddleArray(`${__dirname}/load`).then((middle) => {
      app.use(middle)
    })
  },
  /**
   *
   * methodo responsavel por ler um path e fazer a importaçção de middlewares e retorna 
   * um array de todos os middles encontradis no path
   *
   */
  loadMiddleArray: path => new Promise((resolve, reject) => {
    // array
    const arr = []

    // reader files in path
    fs.readdir(path, (er, f) => {
      if ((_.isUndefined(f)) || (_.isEmpty(f))) {
        resolve([])
      } else {
        // read the file especific
        _.forEach(f, (fileName) => {
            // fazendo as importações dos middlewares
            import(`${path}/${fileName}`).then((middle) => {
              // adicionandoa middleware no servidor express
              arr.push(middle.default)

              resolve(arr)
            }).catch((err) => {
              reject(err)
            })
        })
      }
    })
  })
}

export default middleware
