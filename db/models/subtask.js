'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subtask = sequelize.define('Subtask', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    taskId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    dueDate: {
      type: DataTypes.DATEONLY
    },
    estimatedTime: {
      type: DataTypes.INTEGER
    },
    importance: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    completed: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
  }, {});
  Subtask.associate = function (models) {
    Subtask.belongsTo(models.Task, {
      foreignKey: 'taskId',
      onDelete: 'cascade',
      hooks: true
    })
  };
  return Subtask;
};
