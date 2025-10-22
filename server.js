import http from "http";
import * as url from "node:url";
import {formatContactList, loadContactList} from "./services.js";


console.log('<-- Contact List -->');

const contactList = [];

const server = http.createServer((req, res) => {
    const urlData = url.parse(req.url, true);

    console.log(req.method + " " + req.url);
    let responseData = null;
    if (urlData.query.format === 'true') {
        res.setHeader("Content-Type", "text/html");
        responseData = '<pre>'
        responseData += formatContactList(contactList);
        responseData += '</pre>'
    }
    else {
        res.setHeader("Content-Type", "application/json");
        responseData = JSON.stringify(contactList);
    }

    res.writeHead(200);
    res.write(responseData);
    res.end();
});

async function main() {
    const loadContacts = await loadContactList();
    contactList.push(...loadContacts);
    server.listen(3000 ,()=>{
        console.log('Server started on port 3000');
    });
}
await main()