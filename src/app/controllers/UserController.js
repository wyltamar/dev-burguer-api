import { v4 } from "uuid"
import User from '../models/User.js'


class UserController{

    async store(request, response){

        const { name, email, password_hash, admin} = request.body

        const existintUser = await User.findOne({
            where: {
               email
            }
        })

        if(existintUser){
            return response.status(400).json(
               {message : "Email já está cadastrado, por favor informe um novo email!"}
            )
        }

         const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin,
         })

         return response.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
         })

        
    }

}

export default new UserController()