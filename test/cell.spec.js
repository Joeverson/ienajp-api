
/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'
import Messages from '../src/utils/Messages';

const expect = chai.expect
let cell = {}

export default () => {

  describe('Cell', () => {
    // listando os cell
    it('list cell success', async () => {
      let result = await request.get({
        uri: `${Constants.URL_BASE}/cell`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal(Messages.cell.success.list)
    })

    // adicionando um cell
    it('create cell success', async () => {
      const data = {} // adicionar as informações para serem inseridas no teste

      let result = await request({
        method: 'POST',
        uri: `${Constants.URL_BASE}/cell`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        body: {
          ...data
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.cell.success.create)

      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)

      // pegando o cell para remover posteriormente
      cell = result.data
    })

    // atualizar um cell
    it('update cell success', async () => {
      const data = {
        ...cell,
        name: '',
      }

      let result = await request({
        method: 'PUT',
        uri: `${Constants.URL_BASE}/cell/${data._id}`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        body: {
          ...data
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.cell.success.edit)

      expect(result.data.ok).to.equal(1)
    })

    // atualizar um cell
    it('delete cell success', async () => {
      const data = {
        ...cell
      }

      let result = await request({
        method: 'DELETE',
        uri: `${Constants.URL_BASE}/cell/${data._id}`,
        headers: {
          Authorization: `Bearer undefined`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.cell.success.delete)

      expect(result.data.ok).to.equal(1)
    })
  })
}

