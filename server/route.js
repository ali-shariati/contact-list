import express from "express";
import {formatContactList, generateContactId, loadContactList, saveContactList} from "../services.js";

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

router.post("/create", (req, res) => {
    const {firstName, lastName} = req.body;
    const id =  generateContactId(contactList);

    const newContact = {
        id,
        firstName ,
        lastName,
    }
    contactList.push(newContact)
    saveContactList(contactList);
    res.send(`The Contact ${firstName} ${lastName} has been added successfully.`);
})

const loadContacts = await loadContactList();
contactList.push(...loadContacts);

export default router;