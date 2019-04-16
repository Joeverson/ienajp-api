/* eslint-disable */

import chai from 'chai'
import request from 'request-promise'
import * as Constants from './Constants'

const expect = chai.expect

export default () => {
  describe ('Login', () => {
    it('Doing login', async () => {
      let result = await request.post({
        uri: `${Constants.URL_BASE}/login`,
        form: Constants.AUTH,
        json: true
      })

      expect(result.status.success).to.be.true
      expect(result.token).to.be.a('string')
      expect(result.data).to.be.a('object')
      expect(result.status.message).to.equal('login.signIn.success')

      process.env.TOKEN = result.token
    })
  })
}
