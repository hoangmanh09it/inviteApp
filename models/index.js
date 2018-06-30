import Sequelize from 'sequelize'
import UserModel from './user'
import InviteTokenModel from './inviteToken'

const sequelize = new Sequelize(process.env.database, process.env.username,  process.env.password, {
  host: process.env.host,
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
