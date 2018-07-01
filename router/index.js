import Joi from 'joi'
import passport from 'passport'
import express from 'express'
import validate from 'express-validation'
import authCtr from '../controllers/authController'
import inviteToken from '../controllers/inviteController'

const router = express.Router()

/**
 * required parameter in auth/login API
 */
const LoginBody = {
  body: {
    username: Joi.string().required().strip(),
    password: Joi.string().required().strip()
  }
}

/**
 * Required value in login via invite token
 */
const LoginInviteTokenBody = {
  body: {
    code: Joi.string().required().strip()
  }
}

/**
 * Auth routing
 */
router.route('/auth/login').post(
  validate(LoginBody),
  authCtr.Login
)
router.route('/auth/logout').get(
  authCtr.Logout
)
router.route('/auth/invite-token-login').post(
  validate(LoginInviteTokenBody),
  authCtr.LoginViaInviteToken
)

/**
 * Invite token resouce routing
 */
router.route('/invite-token').get(
  passport.authenticate(
    'jwt', {
      session: false
    }
  ),
  inviteToken.Index
)

/**
 * generate invite token
 */
router.route('/invite-token').post(
  passport.authenticate(
    'jwt', {
      session: false
    }
  ),
  inviteToken.Post
)

/**
 * get invite token detail
 */
router.route('/invite-token/:tokenId').get(
  inviteToken.Show
)

/**
 * Update invite token
 */
router.route('/invite-token/:tokenId').put(
  passport.authenticate(
    'jwt', {
      session: false
    }
  ),
  inviteToken.Put
)

export default router
