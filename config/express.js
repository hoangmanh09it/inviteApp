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
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import fs from 'fs'

/**
 * Set Global variable to process.env object
 */
const env = process.env.APP_ENV || 'development'
const config = require('./config.json')
const configData = config[env]
const keys = Object.keys(configData)
for (let key of keys) {
  process.env[key] = configData[key]
}

const app = express()
const server = require('http').createServer(app)

/**
 * Allow cross method option
 */
app.use(function (req, res, next) {
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

/**
 * parse body params and attache them to req.body
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

/**
 * configure passport for authentication
 */
passConfig(passport)
app.use(passport.initialize())

/**
 * secure apps by setting various HTTP headers
 */
app.use(helmet())

/**
 *  enable CORS - Cross Origin Resource Sharing
 */
app.use(cors())

/**
 * Generate Swagger document
 */
if (env === 'development') {
  let swaggerDocument = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../api_doc/swagger.json'), 'utf8'))
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

/**
 * routing main API with prefix api
 */
app.use('/api', router)

/**
 * Handle error
 */
app.use((err, req, res, next) => {
  res.status(500).json(err)
})

/**
 * catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  res.status(404)
  res.send({
    status: 404,
    statusText: 'Api not found'
  })
})

export default server
