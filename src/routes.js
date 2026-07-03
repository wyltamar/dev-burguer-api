import { Router } from "express";
import { UUIDV4 } from "sequelize";
import { v4 } from "uuid";
import User from "./app/models/User.js";

const routes = new Router();

routes.get('/', async (req,res) => {

    const user = {
        id: v4(),
        name: 'Wyltamar',
        email: 'wyltamar@emaill.com.br',
        password_hash: '12789',
        admin: false,
    }

    await User.create(user)

    res.status(201).json(user)
})


export default routes