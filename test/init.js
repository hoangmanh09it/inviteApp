import async from 'async'

const config = require('../config/env/unittest.json')
const keys = Object.keys(config)
for (const key of keys) {
  process.env[key] = config[key]
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
