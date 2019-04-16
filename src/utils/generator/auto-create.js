/**
 *
 * Version: Prototipo.Pre-Alfa.0.0.1
 *
 * esse script é responsavel por criar qualquer modulo para o sistema
 * onde você passa alguns parametros como: nome do modulo, nome arquivo especifico, etc.
 * e ele ira montar os arquivos e as coisas todas
 *
 * exemplo: "$~ node scarfold.js products"
 *
 * O comando a cima é responsavel por quiar o conjunto de arquivos num modulo chamado products, por
 * definição os nomes dos modulos devem ser o nome doas tabelas do banco de dados utiliando o padrão
 * camelCase, sabendo o nome da tabela ele irá criar o model espelhando o banco de dados
 *
 * exemplo: node scarfold.js products facade --clean
 *
 * O exemplo a cima é uma forma simples de sobresescrever um arquivo especifico, limpando ele primeiro
 * e depois irá recria-lo com base no que se tem no script
 *
 * Caso queira criar um unico arquivo e só informar as coisas de cima sem o '--clean' e ele irá criar dentro de
 * modulo pre definido
 */

const _ = require('lodash')
const dotenv = require('dotenv')
const {
  Client
} = require('pg')
const fs = require('fs')

// carregando os dados do env
dotenv.config()

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
})

client.connect()

/**
 *
 *  class controller
 *
 */
const Scarfold = {
  path: 'src/modules',
  paths: {},
  moduleName: process.argv[2],
  /**
   * get names colunms for use in model file
   *
   * @param {String} table name of the table
   */
  async columns (table) {
    const cols = []
    try {
      const columns = await client.query(`select column_name, is_nullable as isNull from information_schema.columns where table_name='${table}';`)

      if (_.isEmpty(columns.rows)) throw new TypeError(`Table ${table} not found!`)

      _.forEach(columns.rows, (col) => {
        cols.push({
          db: col.column_name,
          json: this.underScoreByCamelCase(col.column_name),
          isNullable: col.isnull
        })
      })

      return cols
    } catch (err) {
      console.log(err)
      process.exit(0)
    }
  },
  /**
   * for to upper case the first letter
   * @param {String} word
   */
  uFirst (word) {
    return word[0].toUpperCase() + word.slice(1)
  },
  /**
   * função que adapta as rotas para ler se vem na rota composta ou simples
   * ou seja caso o nome do banco de dados que é 'casa_da_veia' converte para
   * a seguinte forma 'casaDaVeia'
   *
   */
  underScoreByCamelCase: (name) => {
    const arr = name.split('_')
    const word = []

    _.forEach(arr, (letter) => {
      // condicionais de ignores
      word.push(letter[0].toUpperCase() + letter.slice(1)) // controlle caso já venha com o '-' no modulo | só controlle de erros
    })

    word[0] = word[0].toLowerCase()

    return word.join('')
  },
  CamelCaseByunderScore: (name, type) => {
    type = type || '_'

    const arr = name.split([])
    const word = []

    _.forEach(arr, (letter) => {
      // condicionais de ignores
      if (letter === letter.toUpperCase()) {
        word.push(type, letter.toLowerCase()) // controlle caso já venha com o '-' no modulo | só controlle de erros
      } else {
        word.push(letter)
      }
    })

    const joined = word.join('')

    const regex = new RegExp(`${type}`)
    return regex.test(joined) ? joined : name
  },

  /**
   *
   * criando um arquivo no node que seram as paradinhas do modulos
   *
   */
  file: {
    async create (path, content) {
      await fs.appendFile(path, content, (err) => {
        if (err) throw err

        console.log(`Criado ${path}!!`)
      })
    },
    async clean (path) {
      await fs.truncate(path, 0, () => {
        console.log('Clean!')
      })
    },
    async new (path, content) {
      fs.writeFile(path, content, (err) => {
        if (err) throw err

        console.log(`refeito ${path}!!`)
      })
    }
  },
  /**
   *
   * fazendo os arquivos para os modulos
   *
   *
   */
  async model () {
    try {
      const columns = await this.columns(this.CamelCaseByunderScore(this.moduleName))

      const colsNamesConstruct = []
      const isNullableArray = []
      const propertsArray = []

      await _.forEach(columns, (col) => {
        colsNamesConstruct.push(`\t\t\t\t\t\t\t${col.json}`)
        /*
 *
 * Nõa esta mal identado é a string deve ficar assim para que o arquivo  fique identado corretamente
 *
 */
        if (col.isNullable === 'NO') {
          isNullableArray.push(`
    if (${col.json} != null) {
      this.${col.db} = ${col.json};
    }
        `)
        } else {
          propertsArray.push(`\t\tthis.${col.db} = ${col.json}; \n`)
        }
      })

      const model = `
/**
 * 
 * 
 * Database: ${this.CamelCaseByunderScore(this.moduleName)}
 * Create_at: ${new Date(Date.now())}
 * 
*/

export default class ${this.uFirst(this.moduleName)} {
  constructor(${colsNamesConstruct.join(', \n')} ) {
${isNullableArray.join('')}
${propertsArray.join('')}
  }
}
    `

      return model
    } catch (err) {
      console.log(err)
    }
  },
  /**
   *
   * criando as rotas padrão
   *
   */
  router () {
    const router = `
import Express from 'express';
import logger from '../../utils/logger';
import Context from '../../utils/context';

import Workflow from './${this.uFirst(this.moduleName)}';
import FacadeException from '../../exceptions/FacadeException';

const App = Express.Router();

/**
 * -------------------------------
 * routes API /${this.CamelCaseByunderScore(this.moduleName, '-')}
 * --------------------------------
 * * */
App.route('/')
  .get((req, res) => {
    res.send({});
  })
  .post((req, res) => {
    res.send({});
  });

App.route('/:id')
  .get((req, res) => {
    res.send({});
  })
  .put((req, res) => {
    res.send({});
  })
  .delete((req, res) => {
    res.send({});
  });

export default App;
`

    return router
  },
  /**
   *
   * criando a base para o DAO
   *
   */
  dao () {
    const dao = `
/**
 * 
 * Scarfold *JhoexNode*
 * 
 * Database: ${this.CamelCaseByunderScore(this.moduleName)}
 * Create_at: ${new Date(Date.now())}
 * 
 */
import Schema from '../../db/schema';

export default class ${this.uFirst(this.moduleName)} extends Schema {
  constructor() {
    super('${this.CamelCaseByunderScore(this.moduleName)}');
  }
}
`

    return dao
  },
  /**
   *
   * gerando o facade
   *
   */
  facade () {
    const facade = ` 
/**
* 
* Scarfold *JhoexNode*
* Create_at: ${new Date(Date.now())}
* 
*/
import FacadeException from '../../exceptions/FacadeException';
import dao from './DAO';

const dao = new DAO();

export default {

};
`

    return facade
  },
  /**
   * create all module
  */
  async moduleCreate () {
    // criando os arquivos
    this.model().then((content) => {
      this.file.create(`${__dirname}/${this.path}/${this.moduleName}/${this.uFirst(this.moduleName)}.js`, content)
      this.file.create(`${__dirname}/${this.path}/${this.moduleName}/DAO.js`, this.dao())
      this.file.create(`${__dirname}/${this.path}/${this.moduleName}/Facade.js`, this.facade())
      this.file.create(`${__dirname}/${this.path}/${this.moduleName}/routes.js`, this.router())
    })
  },
  /**
   *
   * executar todo o scarfold e cria a parada
   *
   */
  async run () {
    const args = process.argv

    const pathComplete = `${__dirname}/${this.path}/${this.moduleName}`

    this.paths = {
      facade: `${__dirname}/${this.path}/${this.moduleName}/Facade.js`,
      model: `${__dirname}/${this.path}/${this.moduleName}/${this.uFirst(this.moduleName)}.js`,
      dao: `${__dirname}/${this.path}/${this.moduleName}/DAO.js`,
      routes: `${__dirname}/${this.path}/${this.moduleName}/routes.js`
    }

    // verificando se o diretorio existe ou não se sim faz nada se não ele cria um
    if (!fs.existsSync(`${__dirname}/${this.path}/${this.moduleName}`)) {
      // Do something
      fs.mkdirSync(pathComplete)
    }

    try {
      if (_.isUndefined(args[3])) {
        await this.moduleCreate()
      } else if (!_.isUndefined(args[3])) {
        const method = this.commands.methods.filter(o => o.name === args[3])
        const param = this.commands.params.filter(o => o.name === args[4])

        // caso não esteja na lista ele avisa
        if (!_.isEmpty(param)) {
          await param[0].run()
        } else {
          console.log('unregistered param')
          process.exit(0)
        }

        // caso não esteja na lista ele avisa
        if (!_.isEmpty(method)) {
          await method[0].run()
        } else {
          console.log('unregistered method')
          process.exit(0)
        }
      } else {
        console.log(process.exit(0))
      }
    } catch (err) {
      console.log(err)
      process.exit(0)
    }
  },
  /**
   * listra de comandos que pdoem ser chamados no sistema
   *
   */
  commands: {
    scar: this,
    methods: [{
      name: 'model',
      async run () {
        await Scarfold.file.create(Scarfold.paths[process.argv[3]], await Scarfold.model())
      }
    }, {
      name: 'facade',
      async run () {
        await Scarfold.file.create(Scarfold.paths[process.argv[3]], Scarfold.facade())
      }
    }, {
      name: 'dao',
      async run () {
        await Scarfold.file.create(Scarfold.paths[process.argv[3]], Scarfold.dao())
      }
    }, {
      name: 'routes',
      async run () {
        await Scarfold.file.create(Scarfold.paths[process.argv[3]], Scarfold.router())
      }
    }],
    params: [{
      name: '--clean',
      async run () {
        await Scarfold.file.clean(Scarfold.paths[process.argv[3]])
      }
    }]
  }
}

/**
 *
 * RUNNER
 *
 */
Scarfold.run()
