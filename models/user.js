'use strict'
export default (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  })

  return User
}
