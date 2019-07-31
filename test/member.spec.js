
/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'
import Messages from '../src/utils/Messages';

const expect = chai.expect
let member = {}

export default () => {

  describe('Member', () => {
    // listando os member
    it('list member success', async () => {
      let result = await request.get({
        uri: `${Constants.URL_BASE}/member`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('Array')
      expect(result.status.message).to.equal(Messages.member.success.list)
    })

    // adicionando um member
    it('create member success', async () => {
      const data = {} // adicionar as informações para serem inseridas no teste

      let result = await request({
        method: 'POST',
        uri: `${Constants.URL_BASE}/member`,
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
      expect(result.status.message).to.equal(Messages.member.success.create)

      expect(result.data.name).to.equal(data.name)
      expect(result.data.email).to.equal(data.email)

      // pegando o member para remover posteriormente
      member = result.data
    })

    // atualizar um member
    it('update member success', async () => {
      const data = {
        ...member,
        name: '',
      }

      let result = await request({
        method: 'PUT',
        uri: `${Constants.URL_BASE}/member/${data._id}`,
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
      expect(result.status.message).to.equal(Messages.member.success.edit)

      expect(result.data.ok).to.equal(1)
    })

    // atualizar um member
    it('delete member success', async () => {
      const data = {
        ...member
      }

      let result = await request({
        method: 'DELETE',
        uri: `${Constants.URL_BASE}/member/${data._id}`,
        headers: {
          Authorization: `Bearer undefined`
        },
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal(Messages.member.success.delete)

      expect(result.data.ok).to.equal(1)
    })
  })
}

