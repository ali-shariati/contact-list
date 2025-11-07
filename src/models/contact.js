import { DataTypes } from "sequelize";

export default function (sequelize) {
    const Contact = sequelize.define(
        "Contact",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            firstName: { type: DataTypes.STRING(20), allowNull: false },
            lastName: { type: DataTypes.STRING(20), allowNull: false },
            mobileNumber: { type: DataTypes.STRING(32) },
            isFavorite: { type: DataTypes.BOOLEAN, defaultValue: false },
            profilePicture: { type: DataTypes.BLOB },
            contactCategoryId: { type: DataTypes.INTEGER, field: "ContactCategoryId" },
            userId: { type: DataTypes.INTEGER, field: "UserId" },
            createdAt: { type: DataTypes.DATE, field: "createdAt" },
            updatedAt: { type: DataTypes.DATE, field: "updatedAt" }
        },
        {
            tableName: "Contacts",
            freezeTableName: true,
            timestamps: true,
            defaultScope: {
                attributes: { exclude: ["UserId", "ContactCategoryId"] }
            }
        }
    );

    Contact.prototype.toJSON = function () {
        const v = { ...this.get() };
        delete v.UserId;
        delete v.ContactCategoryId;
        return v;
    };

    return Contact;
}
