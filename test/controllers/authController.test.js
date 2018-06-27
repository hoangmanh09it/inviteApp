import authCtr from '../../controllers/authController'
import httpMocks from 'node-mocks-http'
import {
  EventEmitter
} from 'events'

function buildResponse () {
  return httpMocks.createResponse({
    eventEmitter: EventEmitter
  })
}

describe('auth Controller Testing', function () {
  describe('login function testing', () => {
    it('upper', function (done) {
      var response = buildResponse()
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          username: 'admin',
          password: 'password'
        },
        url: '/auth/login'
      })
      authCtr.LOGIN(request, response)
      response.on('end', function () {
        // let data = response._getData()
        expect(response.statusCode).to.be(200)
        done()
      })
    })
  })
})
