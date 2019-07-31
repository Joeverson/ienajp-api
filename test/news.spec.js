
/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'
import Messages from '../src/utils/Messages';

const expect = chai.expect
let news = {}

export default () => {

  describe('News', () => {
    // listando os news
    it('list news success', async () => {
      let result = await request.get({
        uri: `${Constants.URL_BASE}/news`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal(Messages.news.success.list)
    })

    // adicionando um news
    it('create news success', async () => {
      const data = {} // adicionar as informações para serem inseridas no teste

      let result = await request({
        method: 'POST',
        uri: `${Constants.URL_BASE}/news`,
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
      expect(result.status.message).to.equal(Messages.news.success.create)

      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)

      // pegando o news para remover posteriormente
      news = result.data
    })

    // atualizar um news
    it('update news success', async () => {
      const data = {
        ...news,
        name: '',
      }

      let result = await request({
        method: 'PUT',
        uri: `${Constants.URL_BASE}/news/${data._id}`,
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
      expect(result.status.message).to.equal(Messages.news.success.edit)

      expect(result.data.ok).to.equal(1)
    })

    // atualizar um news
    it('delete news success', async () => {
      const data = {
        ...news
      }

      let result = await request({
        method: 'DELETE',
        uri: `${Constants.URL_BASE}/news/${data._id}`,
        headers: {
          Authorization: `Bearer undefined`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.news.success.delete)

      expect(result.data.ok).to.equal(1)
    })
  })
}

