import inviteTokenCtr from '../../controllers/inviteController'
import httpMocks from 'node-mocks-http'
import expect from 'expect.js'

function buildResponse () {
  return httpMocks.createResponse({
    eventEmitter: require('events').EventEmitter
  })
}

describe('Invite token Controller testing', function () {
  describe('Testing invite token GET/POST/PUSH/INDEX method', () => {
    var inviteTokenIdCreated = 0
    it('Test generate invite token', function (done) {
      let response = buildResponse()
      let request = httpMocks.createRequest({
        method: 'POST',
        url: '/invite-token'
      })
      inviteTokenCtr.Post(request, response)
      response.on('end', () => {
        let data = response._getData()
        inviteTokenIdCreated = data.data.id
        expect(data.status).to.be(200)
        expect(response.statusCode).to.be(200)
        done()
      })
    })

    it('Testing get list invite token', function (done) {
      let response = buildResponse()
      response.on('end', function () {
        let data = response._getData()
        expect(response.statusCode).to.be(200)
        expect(data.status).to.be(200)
        expect(data.data).to.an('array')
        done()
      })
      let request = httpMocks.createRequest({
        method: 'GET',
        url: '/invite-token'
      })
      inviteTokenCtr.Index(request, response)
    })

    it('Testing get invite token detail with id is available in database',
      function (done) {
        let response = buildResponse()
        response.on('end', function () {
          let data = response._getData()
          expect(response.statusCode).to.be(200)
          expect(data.status).to.be(200)
          expect(data.data.id).equal(inviteTokenIdCreated)
          done()
        })
        let request = httpMocks.createRequest({
          method: 'GET',
          params: {
            tokenId: inviteTokenIdCreated
          },
          url: '/invite-token/' + inviteTokenIdCreated
        })
        inviteTokenCtr.Show(request, response)
      }
    )

    it('Testing get invite token detail with id is not available in database',
      function (done) {
        let response = buildResponse()
        response.on('end', function () {
          let data = response._getData()
          expect(response.statusCode).to.be(404)
          expect(data.status).to.be(404)
          done()
        })
        let request = httpMocks.createRequest({
          method: 'GET',
          params: {
            tokenId: 12345679
          },
          url: '/invite-token/' + 12345679
        })
        inviteTokenCtr.Show(request, response)
      }
    )

    it('Testing get invite token detail with id is not available in database',
      function (done) {
        let response = buildResponse()
        response.on('end', function () {
          let data = response._getData()
          expect(response.statusCode).to.be(404)
          expect(data.status).to.be(404)
          done()
        })
        let request = httpMocks.createRequest({
          method: 'GET',
          params: {
            tokenId: 12345679
          },
          url: '/invite-token/' + 12345679
        })
        inviteTokenCtr.Show(request, response)
      }
    )

    it('Testing update invite token (Disable invite token)',
      function (done) {
        let response = buildResponse()
        response.on('end', function () {
          let data = response._getData()
          expect(response.statusCode).to.be(200)
          expect(data.status).to.be(200)
          done()
        })
        let request = httpMocks.createRequest({
          method: 'PUT',
          params: {
            tokenId: inviteTokenIdCreated
          },
          body: {
            active: false
          },
          url: '/invite-token/' + inviteTokenIdCreated
        })
        inviteTokenCtr.Put(request, response)
      }
    )

    it('Testing update invite token (active invite token)',
      function (done) {
        let response = buildResponse()
        response.on('end', function () {
          let data = response._getData()
          expect(response.statusCode).to.be(200)
          expect(data.status).to.be(200)
          done()
        })
        let request = httpMocks.createRequest({
          method: 'PUT',
          params: {
            tokenId: inviteTokenIdCreated
          },
          body: {
            active: true
          },
          url: '/invite-token/' + inviteTokenIdCreated
        })
        inviteTokenCtr.Put(request, response)
      }
    )

    it('Testing update invite token do not available in database',
      function (done) {
        let response = buildResponse()
        response.on('end', function () {
          let data = response._getData()
          expect(response.statusCode).to.be(404)
          expect(data.status).to.be(404)
          done()
        })
        let request = httpMocks.createRequest({
          method: 'PUT',
          params: {
            tokenId: 123456
          },
          body: {
            active: true
          },
          url: '/invite-token/' + 123456
        })
        inviteTokenCtr.Put(request, response)
      }
    )
  })
})
