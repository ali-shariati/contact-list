import { DataTypes } from 'sequelize';

export default function(sequelize) {
  return sequelize.define('user', {
    fullName: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
}