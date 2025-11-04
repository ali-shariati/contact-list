import express from "express";
import router from "./routes/contacts.js"
import bodyParser from "body-parser";
import {sequelize} from "../models/index.js";
import {loggerMiddleware} from "./meddlewares/logger.js";
import configs from "../configs/server.js";

try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
} catch (error) {
    console.log('Error in syncing models',error);
    throw error;
}
const app = express();

app.disable('etag')
app.use(loggerMiddleware);
app.use(bodyParser.urlencoded({extended: false}));
app.use("/contacts", router);
app.listen(configs.port, ()=>{console.log('Server started on port 3000')})
