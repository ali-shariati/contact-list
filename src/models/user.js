import { DataTypes } from 'sequelize';

export default function (sequelize) {
  return sequelize.define(
      'User',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        fullName: { type: DataTypes.STRING(40), allowNull: false },
        userName: { type: DataTypes.STRING(25), allowNull: false, unique: true, field: 'userName' },
        password: { type: DataTypes.STRING, allowNull: false },
        createdAt: { type: DataTypes.DATE, field: 'createdAt' },
        updatedAt: { type: DataTypes.DATE, field: 'updatedAt' }
      },
      {
        tableName: 'Users',
        freezeTableName: true,
        timestamps: true
      }
  );
}
