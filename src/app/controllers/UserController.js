import { v4 } from 'uuid'
import * as Yup from 'yup'
import Bcript from 'bcrypt'
import User from '../models/User.js'


class UserController{

    async store(request, response){
       const userSchema = Yup.object({
         name: Yup.string().required(),
         email: Yup.string().email().required(),
         password:Yup.string().min(6).required(),
         admin: Yup.boolean()
       })

       try {
         userSchema.validateSync(request.body,
            {
               abortEarly: false,
               strict: true
            }
         )
       } catch (err) {
         return response.status(400).json({error: err.errors})
       }

        const { name, email, password, admin} = request.body

        const existintUser = await User.findOne({
            where: {
               email
            }
        })

        if(existintUser){
            return response.status(400).json(
               {message : "Email already taken!"}
            )
        }

        const password_hash = await Bcript.hash(password, 10)

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