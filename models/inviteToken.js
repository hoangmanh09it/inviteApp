'use strict'
module.exports = (sequelize, DataTypes) => {
  var InviteToken = sequelize.define('invite_code', {
    code: DataTypes.STRING,
    description: DataTypes.STRING
  }, {})
  InviteToken.associate = function (models) {
    // associations can be defined here
  }
  return InviteToken
}
