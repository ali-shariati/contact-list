import express from "express";
import router from "./route.js"
import bodyParser from "body-parser";
import {sequelize} from "../models/index.js";

const app = express();
console.log('<-- Contact List -->');

function loggerMiddleware(req, res, next) {
    console.log("Request: ", req.method , req.url)
    next();
}

try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
} catch (error) {
    console.log('Error in syncing models',error);
}


app.disable('etag')
app.use(loggerMiddleware);
app.use(bodyParser.urlencoded({extended: false}));
app.use("/contacts", router);
app.listen(3000, ()=>{console.log('Server started on port 3000')})
