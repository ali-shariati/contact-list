import multer from "multer";
import {formatContactList} from "../../utils.js";
import {Contact} from "../../models/index.js";

const upload = multer({ storage: multer.memoryStorage() });

async function loadContacts(req, res, next) {
    try{
        const {
            sort,
            desc,
        } = req.query;

        const order = [];

        if (sort) {
            order.push(
                [sort, desc === 'true' ?'DESC' : 'ASC'],
            );
        }

        const contacts = await Contact.findAll({
                order,
            });

        req.locals = {
            contacts,
        };

        next();
    }
    catch(error){
        res.status(500).send({message:"Something went wrong", error});
    }
}

async function getContactsFormatted (req, res, next) {
    if(req.query.format !== true) {
        return next();
    }
    const {contacts} = req.locals;
    const responseData = `<pre>${formatContactList(contacts)}</pre>`;
    res.type('html');
    res.send(responseData);
}

async function getContactsJSON(req, res) {
    const {contacts} = req.locals;
    const normalizedContacts = contacts.map(({ dataValues: {id, profilePicture, ...rest}})=> ({
        id,
        profilePicture: profilePicture ? `/images/profile-picture/${id}` : null,
        ...rest
    }))
    res.json(normalizedContacts);
}

export const getContacts =[
    loadContacts,
    getContactsFormatted,
    getContactsJSON,
];

export async function getProfilePicture(req, res) {
    try {
        const { profilePicture } = await Contact.findOne({
            attributes: ['profilePicture'],
            where: {id: req.params.id}
        })
        res.type('image/jpeg')
        res.send(profilePicture)
    }catch(err){
        res.status(500).send({message: "Something went wrong", err});
    }
}

async function createContactsCtl(req, res) {
    const { firstName, lastName, mobileNumber, isFavorite } = req.body;
    const { buffer: profilePicture } =req.file || {};
    try {
        const {id} =  await Contact.create({
            firstName,
            lastName,
            mobileNumber,
            isFavorite,
            profilePicture,
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

export const createContacts =[
    upload.single("profilePicture"),
    createContactsCtl,
]

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