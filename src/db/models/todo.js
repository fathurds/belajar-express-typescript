'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'username' });
    }
  }
  todo.init({
    username: {
      type: DataTypes.STRING,
      references: { model: 'users', key: 'username' }
    },
    description: DataTypes.TEXT
  }, {
    tableName: 'todos',
    sequelize,
    modelName: 'Todo',
    underscored: true,
  });
  return todo;
};