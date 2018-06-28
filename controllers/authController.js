import {
  User,
  InviteToken
} from '../models'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

/**
 * Login via username, password
 * @param {Object} req
 * @param {Object} res
 */
const Login = (req, res) => {
  try {
    User.findOne({
      where: {
        username: req.body.username,
        password: crypto.createHash('sha1').update(req.body.password).digest('hex')
      }
    }).then(user => {
      if (!user) {
        res.status(401)
        res.send({
          status: 401,
          statusText: 'Incorrect username or password'
        })
        return
      }
      let responseData = {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
      responseData.token = jwt.sign(responseData, process.env.SECRET_KEY)
      res.send({
        status: 200,
        statusText: 'Login sucess',
        data: responseData
      })
    }).catch(err => (
      res.send(err)
    ))
  } catch (error) {
    res.status(500)
    res.send({
      status: 500,
      statusText: 'Have an error in server',
      err: error
    })
  }
}

const Logout = (req, res) => {

}

/**
 * Login via invite token
 * @param {Object} req
 * @param {Object} res
 */
const LoginViaInviteToken = (req, res) => {
  try {
    let inviteCode = req.body.code
    InviteToken.findOne({
      where: {
        code: inviteCode

      }
    }).then(inviteObject => {
      if (!inviteObject) {
        res.status(401)
        res.send({
          status: 401,
          statusText: 'Invite token invalid'
        })
        return
      }
      let responseData = {
        id: inviteObject.id,
        type: 'invite',
        code: inviteObject.code,
        loginAt: new Date().getTime()
      }
      responseData.token = jwt.sign(responseData, process.env.SECRET_KEY)
      res.send({
        status: 200,
        statusText: 'Login sucess',
        data: responseData
      })
    }).catch(err => {
      res.status(500)
      res.send({
        status: 500,
        statusText: 'Have an error in server',
        err: err
      })
    })
  } catch (error) {
    console.logog(error)
    res.status(500)
    res.send({
      status: 500,
      statusText: 'Have an error in server',
      err: error
    })
  }
}

export default {
  Login,
  Logout,
  LoginViaInviteToken
}
