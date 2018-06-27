import bodyParser from 'body-parser'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import methodOverride from 'method-override'
import passport from 'passport'
import passConfig from './passport-config'
import router from '../router'

// load controller
// import {
//   LOGIN
// } from '../controllers/authController'
// import inviteCtrl from '../controllers/inviteController'

const env = process.env.APP_ENV || 'local'
const config = require(`./env/${env}.json`)
const keys = Object.keys(config)
for (let key of keys) {
  process.env[key] = config[key]
}

const app = express()
const server = require('http').createServer(app)

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

// configure passport for authentication
passConfig(passport)
app.use(passport.initialize())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/api', router)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(400).json(err)
})
// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('not foud')
})

export default server
