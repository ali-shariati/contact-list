import { DataTypes } from "sequelize";

export default function (sequelize) {
    return sequelize.define(
        "ContactCategory",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING(20), unique: true },
            createdAt: { type: DataTypes.DATE, field: "createdAt" },
            updatedAt: { type: DataTypes.DATE, field: "updatedAt" }
        },
        {
            tableName: "ContactCategories",
            freezeTableName: true,
            timestamps: true
        }
    );
}
