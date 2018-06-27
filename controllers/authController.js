import {
  User
} from '../models'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

/**
 *  The API Login
 * @param  {string} '/login' the name url for api login
 * @param  {object} function(req, res)
 */

const LOGIN = (req, res) => {
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

const LOGOUT = (req, res) => {

}

export default {
  LOGIN,
  LOGOUT
}