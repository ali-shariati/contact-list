import {DataTypes} from "sequelize";

export default function ContactCategory(sequelize) {
    return sequelize.define('contactCategory', {
        name: {
            type: DataTypes.STRING(20),
            unique: true,
        }
    })
}