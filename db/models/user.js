'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    level: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    exp: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.List, {foreignKey: 'userId'});
    User.hasMany(models.Task, {foreignKey: 'userId'});
  };
  return User;
};
