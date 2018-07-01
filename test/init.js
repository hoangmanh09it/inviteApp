import async from 'async'

const env = process.env.APP_ENV || 'development'
const config = require('../config/config.json')
const configData = config[env]
const keys = Object.keys(configData)
for (let key of keys) {
  process.env[key] = configData[key]
}

async.waterfall([
  (next) => {
    setTimeout(() => {
      console.log('step1')
      next()
    }, 100)
  },
  () => {
    console.log('step 2')
  }
])
