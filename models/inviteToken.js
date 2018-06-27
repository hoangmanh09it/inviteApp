'use strict'
module.exports = (sequelize, DataTypes) => {
  var InviteToken = sequelize.define('invite_token', {
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {})
  InviteToken.associate = function (models) {
    // associations can be defined here
  }
  return InviteToken
}
