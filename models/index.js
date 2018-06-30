import Sequelize from 'sequelize'
import UserModel from './user'

import InviteTokenModel from './inviteToken'
const env = process.env.APP_ENV || 'development'
const databaseConfig = require('../config/config.json')
let databaseInfo = databaseConfig[env]

const sequelize = new Sequelize(
  databaseInfo.database,
  databaseInfo.username,
  databaseInfo.password,
  {
    host: databaseInfo.host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
const InviteToken = InviteTokenModel(sequelize, Sequelize)
export {
  User,
  InviteToken
}
