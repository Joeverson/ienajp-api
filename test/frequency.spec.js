
/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'
import Messages from '../src/utils/Messages';

const expect = chai.expect
let frequency = {}

export default () => {

  describe('Frequency', () => {
    // listando os frequency
    it('list frequency success', async () => {
      let result = await request.get({
        uri: `${Constants.URL_BASE}/frequency`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal(Messages.frequency.success.list)
    })

    // adicionando um frequency
    it('create frequency success', async () => {
      const data = {} // adicionar as informações para serem inseridas no teste

      let result = await request({
        method: 'POST',
        uri: `${Constants.URL_BASE}/frequency`,
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
      expect(result.status.message).to.equal(Messages.frequency.success.create)

      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)

      // pegando o frequency para remover posteriormente
      frequency = result.data
    })

    // atualizar um frequency
    it('update frequency success', async () => {
      const data = {
        ...frequency,
        name: '',
      }

      let result = await request({
        method: 'PUT',
        uri: `${Constants.URL_BASE}/frequency/${data._id}`,
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
      expect(result.status.message).to.equal(Messages.frequency.success.edit)

      expect(result.data.ok).to.equal(1)
    })

    // atualizar um frequency
    it('delete frequency success', async () => {
      const data = {
        ...frequency
      }

      let result = await request({
        method: 'DELETE',
        uri: `${Constants.URL_BASE}/frequency/${data._id}`,
        headers: {
          Authorization: `Bearer undefined`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.frequency.success.delete)

      expect(result.data.ok).to.equal(1)
    })
  })
}

