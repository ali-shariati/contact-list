import express from "express";
import router from "./route.js"

const app = express();
console.log('<-- Contact List -->');

function loggerMiddleware(req, res, next) {
    console.log("Request: ", req.method , req.url)
    next();
}

app.disable('etag')
app.use(loggerMiddleware);
app.use("/contacts", router);
app.listen(3000, ()=>{console.log('Server started on port 3000')})
