import {formatContactList} from "../../utils.js";
import {Contact} from "../../models/index.js";

export async function getContacts(req, res) {
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
}

export async function createContacts(req, res) {
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
}

export async function deleteContacts(req, res) {
    try{
        await Contact.destroy({where: {id: req.params.id}});
        res.send(`Contact ${req.params.id} has been deleted.`);
    }
    catch(err){
        res.status(400).send(
            {message: "Something went wrong",
                err
            });
    }
}

export async function updateContacts(req, res) {
    try {
        const {firstName, lastName, mobileNumber, isFavorite} = req.body;
        await Contact.update(
            {
                firstName,
                lastName,
                mobileNumber,
                isFavorite,
            },
            {where: {id: req.params.id}}
        )
        res.send(`Contact ${req.params.id} has been updated successfully.`);
    } catch (err){
        res.status(400).send({message: "Something went wrong",err});
    }
}