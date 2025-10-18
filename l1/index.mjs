import http from "http";
import * as url from "node:url";

const server = http.createServer((req, res) => {
    const urlData = url.parse(req.url, true);
    const {name} = urlData.query;

    const message = name
    ? `Hello ${name}` : 'Hello World'

    res.write(message);
    res.end();
});

server.listen(3000 ,()=>{
    console.log('Server started on port 3000');
});