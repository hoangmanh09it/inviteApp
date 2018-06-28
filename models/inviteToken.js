'use strict'
export default (sequelize, DataTypes) => {
  var InviteToken = sequelize.define('invite_token', {
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })

  return InviteToken
}
