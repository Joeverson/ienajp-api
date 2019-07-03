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
const fs = require('fs')
/**
 *
 *  class controller
 *
 */
const Scarfold = {
  path: '../../modules',
  paths: {},
  moduleName: process.argv[2],
  helper: () => {
    return `
  Version: Prototipo.Pre-Alfa.0.0.1
 
  esse script é responsavel por criar qualquer modulo para o sistema
  onde você passa alguns parametros como: nome do modulo, nome arquivo especifico, etc.
  e ele ira montar os arquivos e as coisas todas
 
  exemplo: "$~ npm run generate products"
 
  O comando a cima é responsavel por quiar o conjunto de arquivos num modulo chamado products, por
  definição os nomes dos modulos devem ser o nome doas tabelas do banco de dados utiliando o padrão
  camelCase, sabendo o nome da tabela ele irá criar o model espelhando o banco de dados
 
  exemplo: npm run generate products model--clean
 
  O exemplo a cima é uma forma simples de sobresescrever um arquivo especifico, limpando ele primeiro
  e depois irá recria-lo com base no que se tem no script
 
  Caso queira criar um unico arquivo e só informar as coisas de cima sem o '--clean' e ele irá criar dentro de
  modulo pre definido`
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
  underScoreByCamelCase: (name, type) => {
    const arr = name.split(type || '_')
    const word = []

    _.forEach(arr, (letter) => {
      // condicionais de ignores
      word.push(letter[0].toUpperCase() + letter.slice(1)) // controlle caso já venha com o '-' no modulo | só controlle de erros
    })

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
  model () {
    return `
import Database from '../../../config/database'

const schema = new Database.Schema({

})

export default Database.model('${this.underScoreByCamelCase(this.moduleName, '-')}', schema)
`
  },
  /**
   *
   * criando as rotas padrão
   *
   */
  router () {
    return `
import Express from 'express'
import {
  Context
} from '../../utils'
import Repository from './Repository'
import Messages from '../../utils/Messages'

const App = Express.Router()

/**
 * -------------------------------
 * routes API /${this.CamelCaseByunderScore(this.moduleName, '-')}
 * --------------------------------
 * * */
App.route('/')
  .get((req, res) => {
    const context = new Context(res)

    Repository.all()
      .then(data => {
        context.success(data, Messages.${this.moduleName}.success.list)
      })
      .catch(err => {
        context.error(err)
      })
  })
  .post((req, res) => {
    const context = new Context(res)

    Repository.create(req.body)
      .then(data => {
        context.success(data, Messages.${this.moduleName}.success.create)
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
        context.success(data, Messages.${this.moduleName}.success.edit)
      })
      .catch(err => {
        context.error(err)
      })
  })
  .delete((req, res) => {
    const context = new Context(res)

    Repository.delete(req.params.id)
      .then(data => {
        context.success(data, Messages.${this.moduleName}.success.delete)
      })
      .catch(err => {
        context.error(err)
      })
  })

export default App
`
  },
  /**
   *
   * criando a base para o DAO
   *
   */
  repository () {
    return `
import ${this.underScoreByCamelCase(this.uFirst(this.moduleName), '-')} from './Model'

export default {
  async create (data) {
    // criando o ${this.underScoreByCamelCase(this.uFirst(this.moduleName), '-')}
    return {
      data: await ${this.underScoreByCamelCase(this.uFirst(this.moduleName), '-')}.create(data)
    }
  },

  /**
   * find all users
   */
  async all () {
    return {
      data: await ${this.underScoreByCamelCase(this.uFirst(this.moduleName), '-')}.find({})
    }
  },

  /**
   * Fazendo busca por id
   */
  async findById (id) {
    return {
      data: await ${this.underScoreByCamelCase(this.uFirst(this.moduleName), '-')}.findById(id)
    }
  },

  /**
   * atualizando com base no id
   * @param {Int} id
   * @param {Object} data
   */
  async update (id, data) {
    return {
      data: await ${this.underScoreByCamelCase(this.uFirst(this.moduleName), '-')}.updateOne({
        _id: id
      }, data)
    }
  },

  /**
   * Deletando por id
   * @param {Int} id
   */
  async delete (id) {
    return {
      data: await ${this.underScoreByCamelCase(this.uFirst(this.moduleName), '-')}.deleteOne({
        _id: id
      })
    }
  }
}
`
  },

  /**
   * Validações file content
   */

  validations () {
    return `
export default {

}
`
  },
  /**
   * Validações file content
   */

  testsUnit () {
    return `
/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'
import Messages from '../src/utils/Messages';

const expect = chai.expect
let ${this.moduleName} = {}

export default () => {

  describe('${this.uFirst(this.moduleName)}', () => {
    // listando os ${this.moduleName}
    it('list ${this.moduleName} success', async () => {
      let result = await request.get({
        uri: \`\${Constants.URL_BASE}/${this.moduleName}\`,
        headers: {
          Authorization: \`Bearer \${process.env.TOKEN}\`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal(Messages.${this.moduleName}.success.list)
    })

    // adicionando um ${this.moduleName}
    it('create ${this.moduleName} success', async () => {
      const data = {} // adicionar as informações para serem inseridas no teste

      let result = await request({
        method: 'POST',
        uri: \`\${Constants.URL_BASE}/${this.moduleName}\`,
        headers: {
          Authorization: \`Bearer \${process.env.TOKEN}\`
        },
        body: {
          ...data
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.${this.moduleName}.success.create)

      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)

      // pegando o ${this.moduleName} para remover posteriormente
      ${this.moduleName} = result.data
    })

    // atualizar um ${this.moduleName}
    it('update ${this.moduleName} success', async () => {
      const data = {
        ...${this.moduleName},
        name: '',
      }

      let result = await request({
        method: 'PUT',
        uri: \`\${Constants.URL_BASE}/${this.moduleName}/\${data._id}\`,
        headers: {
          Authorization: \`Bearer \${process.env.TOKEN}\`
        },
        body: {
          ...data
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.${this.moduleName}.success.edit)

      expect(result.data.ok).to.equal(1)
    })

    // atualizar um ${this.moduleName}
    it('delete ${this.moduleName} success', async () => {
      const data = {
        ...${this.moduleName}
      }

      let result = await request({
        method: 'DELETE',
        uri: \`\${Constants.URL_BASE}/${this.moduleName}/\${data._id}\`,
        headers: {
          Authorization: \`Bearer ${process.env.TOKEN}\`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.${this.moduleName}.success.delete)

      expect(result.data.ok).to.equal(1)
    })
  })
}

`
  },

  /**
   * create all module
  */
  async moduleCreate () {
    // criando os arquivos
    this.file.create(`${__dirname}/${this.path}/${this.moduleName}/Model.js`, this.model())
    this.file.create(`${__dirname}/${this.path}/${this.moduleName}/Repository.js`, this.repository())
    this.file.create(`${__dirname}/${this.path}/${this.moduleName}/Validation.js`, this.validations())
    this.file.create(`${__dirname}/${this.path}/${this.moduleName}/routes.js`, this.router())

    // test unit
    this.file.create(`${__dirname}/${this.path}/../../test/${this.moduleName}.spec.js`, this.testsUnit())
  },
  /**
   *
   * executar todo o scarfold e cria a parada
   *
   */
  async run () {
    const args = process.argv

    // testando se esta sendo passado o parametro
    if (!args[2]) {
      console.log(this.helper())
      process.exit(0)
    }

    const pathComplete = `${__dirname}/${this.path}/${this.moduleName}`

    this.paths = {
      repository: `${__dirname}/${this.path}/${this.moduleName}/Repository.js`,
      validation: `${__dirname}/${this.path}/${this.moduleName}/Validation.js`,
      model: `${__dirname}/${this.path}/${this.moduleName}/Model.js`,
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
      name: 'repository',
      async run () {
        await Scarfold.file.create(Scarfold.paths[process.argv[3]], Scarfold.repository())
      }
    }, {
      name: 'model',
      async run () {
        await Scarfold.file.create(Scarfold.paths[process.argv[3]], Scarfold.model())
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
