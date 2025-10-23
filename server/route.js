import express from "express";
import {formatContactList, loadContactList} from "../services.js";

const router = express.Router();
const contactList = [];

router.get("/list", (req, res) => {
    if(req.query.format){
        const responseData = `<pre>${formatContactList(contactList)}</pre>`;
        res.type('text/html');
        res.send(responseData);
        return;
    }
    res.json(contactList);
})

const loadContacts = await loadContactList();
contactList.push(...loadContacts);

export default router;