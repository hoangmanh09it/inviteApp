import { Migration } from '../services'

require('dotenv').config()

const env = process.env.APP_ENV || 'local'
const config = require(`../config/${env}.json`)
const keys = Object.keys(config)
for (const key of keys) {
  process.env[key] = config[key]
}

const migration = new Migration({ console })
const exec = process.argv[2] || 'up'
migration.migrate(exec, (err, count) => {
  if (err) {
    console.log('\x1b[31mMigrate error: ' + err.message + '\x1b[0m')
    process.exit(1)
  }
  if (!count) {
    console.log('\x1b[32mNothing to migrate.\x1b[0m')
  } else {
    console.log('\x1b[32mMigrate: ' + count + ' files.\x1b[0m')
  }
  process.exit(0)
})
