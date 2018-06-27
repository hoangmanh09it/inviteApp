import passportLocal from 'passport-local'
import {
  User
} from '../models'
import crypto from 'crypto'
import passportJWT from 'passport-jwt'
const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const passConfig = (passport) => {
  // passport.use(new LocalStrategy({
  //     usernameField: 'username',
  //     passwordField: 'password'
  //   },
  //   (username, password, cb) => {
  //     return User.findOne({
  //         // attributes: ['id', 'username', 'createdAt', 'updatedAt'],
  //         where: {
  //           username: username,
  //           password: crypto.createHash('sha1').update(password).digest('hex')
  //         }
  //       }).then(user => {
  //         if (!user) {
  //           return cb(null, false, {
  //             message: 'Incorrect email or password.'
  //           })
  //         }
  //         return cb(null, user, {
  //           message: 'Logged In Successfully'
  //         })
  //       })
  //       .catch(err => cb(err))
  //   }
  // ))
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
  },
  (jwtPayload, cb) => {
    return User.findById(jwtPayload.id)
      .then(user => {
        return cb(null, user)
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  }
  ))
}

export default passConfig
