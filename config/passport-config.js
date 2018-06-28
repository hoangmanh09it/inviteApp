import {
  User
} from '../models'
import passportJWT from 'passport-jwt'
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const passConfig = (passport) => {
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