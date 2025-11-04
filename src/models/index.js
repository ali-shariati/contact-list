import {Sequelize} from "sequelize";
import ContactModel from "./contact.js";
import ContactCategoryModel from "./contactCategory.js"
import {config} from "process";

const sequelize = new Sequelize(
    config[p]
)

const Contact = ContactModel(sequelize)
const ContactCategory = ContactCategoryModel(sequelize)

Contact.hasOne(ContactCategory);
Contact.belongsTo(Contact)

export {sequelize};
export {Contact, ContactCategory};