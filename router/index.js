import Joi from 'joi'
import passport from 'passport'
import express from 'express'
import validate from 'express-validation'
import authCtr from '../controllers/authController'
import inviteToken from '../controllers/inviteController'
const router = express.Router()

const LoginBody = {
  body: {
    username: Joi.string().required().strip(),
    password: Joi.string().required().strip()
  }
}

/**
 * Auth routing
 */
router.route('/auth/login').post(
  validate(LoginBody),
  authCtr.LOGIN
)
router.route('/auth/logout').get(
  authCtr.LOGOUT
)

/**
 * Invite token resouce routing
 */
// Get list invite token
router.route('/invite-token').get(
  passport.authenticate('jwt', {
    session: false
  }), inviteToken.Index
)

// generate invite token
router.route('/invite-token').post(
  passport.authenticate('jwt', {
    session: false
  }), inviteToken.Post
)

// get invite token detail
router.route('/invite-token/:tokenId').get(
  inviteToken.Show
)
// Update invite token
router.route('/invite-token/:tokenId').put(
  passport.authenticate('jwt', {
    session: false
  }),
  inviteToken.Put
)
export default router
