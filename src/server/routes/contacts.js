import express from "express";
import {
    createContacts,
    deleteContacts,
    getContacts,
    updateContacts
} from "../controlers/contacts.js";

const router = express.Router();

router.get("/list", getContacts);

router.post("/create", createContacts);

router.delete("/:id",deleteContacts);

router.put("/:id", updateContacts);

export default router;