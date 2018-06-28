import {
  InviteToken
} from '../models'
const LIMIT = 10
const OFFSET = 0

/**
 * Get list invite token
 * @param {Object} req
 * @param {Object} res
 */
const Index = (req, res) => {
  let limit = req.query.limit && !isNaN(req.query.limit) ?
    req.query.limit : LIMIT
  let offset = req.query.offset && !isNaN(req.query.offset) ?
    req.query.offset : OFFSET
  InviteToken.findAll({
    limit: limit,
    offset: offset

  }).then(inviteTokens => {
    res.send({
      status: 200,
      statusText: 'Sucessfull',
      data: inviteTokens
    })
  }).catch(err => {
    res.status(500)
    res.send({
      status: 500,
      statusText: 'Have an error in server',
      err: err
    })
  })
}

/**
 * Api use to generate invite code for admin
 */
const Post = (req, res) => {
  let randomInviteCode = Math.random().toString(36).substring(2, 15)
  InviteToken.create({
    code: randomInviteCode
  }).then(invitetoken => {
    res.send({
      status: 200,
      statusText: 'Sucessfull',
      data: {
        id: invitetoken.id,
        code: invitetoken.code,
        expiredDate: _generateExpiredDateFromCreatedAt(
          invitetoken.createdAt
        )
      }
    })
  }).catch(err => {
    res.status(500)
    res.send({
      status: 500,
      statusText: 'Have an error in server',
      err: err
    })
  })
}

/**
 * Get invite token detail
 * @param {Object} req
 * @param {Object} res
 */
const Show = (req, res) => {
  InviteToken.findOne({
      where: {
        id: req.params.tokenId,
        active: true
      }
    })
    .then(inviteToken => {
      if (!inviteToken) {
        res.status(404)
        res.send({
          status: 404,
          statusText: 'Invite token not foud'
        })
        return
      }
      res.send({
        status: 200,
        statusText: 'Sucessfull',
        data: inviteToken
      })
    }).catch(err => {
      res.status(500)
      res.send({
        status: 500,
        statusText: 'Have an error in server',
        err: err
      })
    })
}

/**
 * Update invite token
 * @param {Object} req
 * @param {Object} res
 */
const Put = (req, res) => {
  let activeStatus = req.body.active
  InviteToken.findOne({
      where: {
        id: req.params.tokenId
      }
    })
    .then(inviteToken => {
      if (!inviteToken) {
        res.status(404)
        return res.send({
          status: 404,
          statusText: 'Invite token not foud'
        })

      }
      inviteToken.updatedAt = new Date()
      if (activeStatus !== undefined && (activeStatus === true || activeStatus == false)) {
        inviteToken.active = activeStatus;
      }
      return inviteToken.save()
    }).then(updatedToken => {
      return res.send({
        status: 200,
        statusText: 'Sucessfull',
        data: updatedToken
      })
    })
    .catch(err => {
      res.status(500)
      return res.send({
        status: 500,
        statusText: 'Have an error in server',
        err: err
      })
    })

  // InviteToken.update(updatedCondition, {
  //     where: {
  //       id: req.params.tokenId
  //     }
  //   })
  //   .then((result) => {
  //     if (result[0] === 0) {
  //       res.status(404)
  //       res.send({
  //         status: 404,
  //         statusText: 'Invite token not foud'
  //       })
  //       return
  //     }
  //     res.send({
  //       status: 200,
  //       statusText: 'Update invite token sucessfull'
  //     })
  //   })
  //   .catch(err => {
  //     res.status(500)
  //     res.send({
  //       status: 500,
  //       statusText: 'Have an error in server',
  //       err: err
  //     })
  //   })
}
/**
 * Generate expired date of invite code base on createdAt.
 * @param {Date} createdAt
 */
const _generateExpiredDateFromCreatedAt = (createdAt) => {
  return new Date(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate() + 7,
    createdAt.getHours(),
    createdAt.getMinutes(),
    createdAt.getSeconds(),
    createdAt.getMilliseconds()
  )
}

export default {
  Index,
  Post,
  Show,
  Put
}