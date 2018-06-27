import Sequelize from 'sequelize'
import UserModel from './user'
import InviteTokenModel from './inviteToken'

const sequelize = new Sequelize('invite_app', 'root', 'password', {
  host: 'localhost',
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
