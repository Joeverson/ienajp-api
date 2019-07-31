
/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'
import Messages from '../src/utils/Messages';

const expect = chai.expect
let church = {}

export default () => {

  describe('Church', () => {
    // listando os church
    it('list church success', async () => {
      let result = await request.get({
        uri: `${Constants.URL_BASE}/church`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal(Messages.church.success.list)
    })

    // adicionando um church
    it('create church success', async () => {
      const data = {} // adicionar as informações para serem inseridas no teste

      let result = await request({
        method: 'POST',
        uri: `${Constants.URL_BASE}/church`,
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
      expect(result.status.message).to.equal(Messages.church.success.create)

      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)

      // pegando o church para remover posteriormente
      church = result.data
    })

    // atualizar um church
    it('update church success', async () => {
      const data = {
        ...church,
        name: '',
      }

      let result = await request({
        method: 'PUT',
        uri: `${Constants.URL_BASE}/church/${data._id}`,
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
      expect(result.status.message).to.equal(Messages.church.success.edit)

      expect(result.data.ok).to.equal(1)
    })

    // atualizar um church
    it('delete church success', async () => {
      const data = {
        ...church
      }

      let result = await request({
        method: 'DELETE',
        uri: `${Constants.URL_BASE}/church/${data._id}`,
        headers: {
          Authorization: `Bearer undefined`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.church.success.delete)

      expect(result.data.ok).to.equal(1)
    })
  })
}

