
/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'
import Messages from '../src/utils/Messages';

const expect = chai.expect
let networking = {}

export default () => {

  describe('Networking', () => {
    // listando os networking
    it('list networking success', async () => {
      let result = await request.get({
        uri: `${Constants.URL_BASE}/networking`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal(Messages.networking.success.list)
    })

    // adicionando um networking
    it('create networking success', async () => {
      const data = {} // adicionar as informações para serem inseridas no teste

      let result = await request({
        method: 'POST',
        uri: `${Constants.URL_BASE}/networking`,
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
      expect(result.status.message).to.equal(Messages.networking.success.create)

      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)

      // pegando o networking para remover posteriormente
      networking = result.data
    })

    // atualizar um networking
    it('update networking success', async () => {
      const data = {
        ...networking,
        name: '',
      }

      let result = await request({
        method: 'PUT',
        uri: `${Constants.URL_BASE}/networking/${data._id}`,
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
      expect(result.status.message).to.equal(Messages.networking.success.edit)

      expect(result.data.ok).to.equal(1)
    })

    // atualizar um networking
    it('delete networking success', async () => {
      const data = {
        ...networking
      }

      let result = await request({
        method: 'DELETE',
        uri: `${Constants.URL_BASE}/networking/${data._id}`,
        headers: {
          Authorization: `Bearer undefined`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.networking.success.delete)

      expect(result.data.ok).to.equal(1)
    })
  })
}

