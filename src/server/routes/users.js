import express from 'express'
import {signup} from "../controlers/users.js";

const router = express.Router();

router.post('/signup', signup );

export default router