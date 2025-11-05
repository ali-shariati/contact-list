import {Sequelize} from "sequelize";
import  UserModel from "./user.js";
import ContactModel from "./contact.js";
import ContactCategoryModel from "./contactCategory.js"
import configs from "../configs/database.cjs";

const sequelize = new Sequelize(
    configs[process.env.NODE_ENV || 'development'],
)

const Contact = ContactModel(sequelize)
const ContactCategory = ContactCategoryModel(sequelize)
const User = UserModel(sequelize)

ContactCategory.hasMany(Contact);
Contact.belongsTo(ContactCategory);

User.hasMany(Contact);
Contact.belongsTo(User);

export {sequelize};
export {Contact, ContactCategory};