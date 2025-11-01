import express from "express";
import {formatContactList, loadContactList, saveContactList} from "../services.js";
import {Contact} from "../models/index.js"

const router = express.Router();
const contactList = [];

router.get("/list", async (req, res) => {

    try{
        const contacts = await Contact.findAll()
        if(req.query.format){
            const responseData = `<pre>${formatContactList(contactList)}</pre>`;
            res.type('html');
            res.send(responseData);
            return;
        }
        res.json(contacts);
    }catch(err){
        res.status(500).send({message: "Server error", err});
    }

})

router.post("/create", async (req, res) => {
    const {firstName, lastName, mobileNumber, isFavorite } = req.body;
    try {
        const {id} =  await Contact.create({
            firstName,
            lastName,
            mobileNumber,
            isFavorite,
        })
        res.send(`The Contact "${id} ${firstName} ${lastName}" has been added successfully.`);
    }catch(err){
        res.status(400).send({
                message: "Something went wrong",
                err
            }
        );
    }
});

router.delete("/:id", (req, res) => {
    if (contactList.length < 1) {
        res.status(400).send({message: "Contact Not Found"});
        return;
    }

    const contactIndex = contactList.findIndex(({id}) => id === Number(req.params.id));
    if (contactIndex < 0) {
        res.status(400).send({message: "Invalid ID"});
        return;
    }
    contactList.splice(contactIndex, 1);
    saveContactList(contactList);
    res.send(`Contact ${req.params.id} has been deleted.`);
});

router.put("/:id", (req, res) => {
    if (contactList.length < 1) {
        res.status(400).send({message: "Contact Not Found"});
        return;
    }
    const contactIndex = contactList.findIndex(({id}) => id === Number(req.params.id));
    if (contactIndex < 0) {
        res.status(400).send({message: "Invalid ID"});
        return;
    }
    const {firstName, lastName} = req.body;
    const contact = contactList[contactIndex]
    const updateContact = {
        ...contact,
        firstName: firstName || contact.firstName,
        lastName: lastName || contact.lastName,
    }
    contactList.splice(contactIndex, 1,updateContact);
    saveContactList(contactList);
    res.send(`Contact ${req.params.id} has been updated successfully.`);
})

const loadContacts = await loadContactList();
contactList.push(...loadContacts);

export default router;