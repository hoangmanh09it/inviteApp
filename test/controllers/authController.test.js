import authCtr from '../../controllers/authController'
import httpMocks from 'node-mocks-http'
import expect from 'expect.js'


const buildResponse = () => {
  return httpMocks.createResponse({
    eventEmitter: require('events').EventEmitter
  })
}

describe('Auth Controller testing', function () {
  describe('Test login function', () => {
    it('Login sucessfull with correct username passwd', function (done) {
      let response = buildResponse()
      let request = httpMocks.createRequest({
        method: 'POST',
        body: {
          username: 'admin',
          password: 'password'
        },
        url: '/auth/login'
      })
      authCtr.LOGIN(request, response)
      response.on('end', () => {
        let data = response._getData()
        expect(data.status).to.be(200)
        expect(response.statusCode).to.be(200)
        done()
      })
    })
    it('Login faill with incorect username password', function (done) {
      let response = buildResponse()
      response.on('end', function () {
        let data = response._getData()
        expect(data.status).to.be(401)
        expect(response.statusCode).to.be(401)
        done()
      })
      let request = httpMocks.createRequest({
        method: 'POST',
        body: {
          username: 'admin',
          password: 'admin'
        },
        url: '/auth/login'
      })
      authCtr.LOGIN(request, response)
    })
    it('Login faill with  username password are undifined', function (done) {
      let response = buildResponse()
      response.on('end', function () {
        let data = response._getData()
        expect(data.status).to.be(500)
        expect(response.statusCode).to.be(500)
        done()
      })
      var request = httpMocks.createRequest({
        method: 'POST',
        url: '/auth/login'
      })
      authCtr.LOGIN(request, response)
    })
  })
})