
/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'
import Messages from '../src/utils/Messages';

const expect = chai.expect
let consolidation = {}

export default () => {

  describe('Consolidation', () => {
    // listando os consolidation
    it('list consolidation success', async () => {
      let result = await request.get({
        uri: `${Constants.URL_BASE}/consolidation`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal(Messages.consolidation.success.list)
    })

    // adicionando um consolidation
    it('create consolidation success', async () => {
      const data = {} // adicionar as informações para serem inseridas no teste

      let result = await request({
        method: 'POST',
        uri: `${Constants.URL_BASE}/consolidation`,
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
      expect(result.status.message).to.equal(Messages.consolidation.success.create)

      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)

      // pegando o consolidation para remover posteriormente
      consolidation = result.data
    })

    // atualizar um consolidation
    it('update consolidation success', async () => {
      const data = {
        ...consolidation,
        name: '',
      }

      let result = await request({
        method: 'PUT',
        uri: `${Constants.URL_BASE}/consolidation/${data._id}`,
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
      expect(result.status.message).to.equal(Messages.consolidation.success.edit)

      expect(result.data.ok).to.equal(1)
    })

    // atualizar um consolidation
    it('delete consolidation success', async () => {
      const data = {
        ...consolidation
      }

      let result = await request({
        method: 'DELETE',
        uri: `${Constants.URL_BASE}/consolidation/${data._id}`,
        headers: {
          Authorization: `Bearer undefined`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.consolidation.success.delete)

      expect(result.data.ok).to.equal(1)
    })
  })
}

