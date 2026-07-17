import * as Yup from 'yup'
import User from '../models/User.js'
import Bcrypt from 'bcrypt'

class SessionController{
    async store(request, response){
        
        const {email, password} = request.body

        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        })

        const messageErro = () => {
            return response.status(400).json({error:'Email or passwor incorrct!'})
        }

        const credentialsIsValid = await schema.isValid(request.body, {strict: true})

        if(!credentialsIsValid){
            messageErro()
        } 

        const existingUser = await User.findOne({
            where: {
              email
            }
        })
        
        if(!existingUser){
           messageErro()
        }

        const isPasswordCorrect = await Bcrypt.compare(password, existingUser.password_hash)

        if(!isPasswordCorrect){
           messageErro()
        }


        response.status(201).json({
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            admin: existingUser.admin,
        })
    }
}

export default new SessionController()