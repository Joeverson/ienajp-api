/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'

const expect = chai.expect
let user = {}

export default () => {

  describe ('User', () => {
    // listando os usuarios
    it('list users success', async () => {
      let result = await request.get({
        uri: `${Constants.URL_BASE}/user`,
        headers: {Authorization: `Bearer ${process.env.TOKEN}`},
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal('user.list.success')
    })

    // adicionando um usuario
    it('create user success', async () => {
      const data = {
        name: 'jonh',
        email: 'jo@doe.com',
        password: '123'
      }

      let result = await request({
        method: 'POST',
        uri: `${Constants.URL_BASE}/user`,
        headers: {Authorization: `Bearer ${process.env.TOKEN}`},
        qs: { ...data },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal('user.create.success')
      
      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)
      
      // pegando o usuario para remover posteriormente
      user = result.data
    })

    // atualizar um usuario
    it('update user success', async () => {
      const data = {
        ...user,
        name: 'jonh Barbosa',
      }

      let result = await request({
        method: 'PUT',
        uri: `${Constants.URL_BASE}/user/${data._id}`,
        headers: {Authorization: `Bearer ${process.env.TOKEN}`},
        qs: { ...data },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal('user.edit.success')
      
      expect(result.data.ok).to.equal(1)
    })

    // atualizar um usuario
    it('delete user success', async () => {
      const data = {
        ...user
      }

      let result = await request({
        method: 'DELETE',
        uri: `${Constants.URL_BASE}/user/${data._id}`,
        headers: {Authorization: `Bearer ${process.env.TOKEN}`},
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal('user.delete.success')
      
      expect(result.data.ok).to.equal(1)
    })
  })
}
