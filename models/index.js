import {Sequelize} from "sequelize";
import ContactModel from "./contact.js";
import ContactCategoryModel from "./contactCategory.js"

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "postgres",
})

const Contact = ContactModel(sequelize)
const ContactCategory = ContactCategoryModel(sequelize)

export {sequelize};
export {Contact, ContactCategory};