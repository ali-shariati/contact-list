import {Sequelize} from "sequelize";
import ContactModel from "./contact.js";
import ContactCategoryModel from "./contactCategory.js"

const sequelize = new Sequelize({
    username: 'admin',
    password: 'adminpass',
    database: 'appdb',
    dialect: "postgres",
    logging: false,
})

const Contact = ContactModel(sequelize)
const ContactCategory = ContactCategoryModel(sequelize)

Contact.hasOne(ContactCategory);
Contact.belongsTo(Contact)

export {sequelize};
export {Contact, ContactCategory};