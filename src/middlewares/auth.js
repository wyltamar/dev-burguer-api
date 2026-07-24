import jwt from 'jsonwebtoken'
import authConfig from './../config/auth.js'

const authMiddleware = (request, response, next) => {
    
    const authToken = request.headers.autorization

    console.log(authToken)
    
    if(!authToken){
        return response.status(401).json({Error: "Token not provided!"})
    } 

    const token = authToken.split(' ')[1]

    try {
        jwt.verify(token, authConfig.secret, (error, decoded)=>{
            if(error){
                
                throw Error()
            }

            request.userId = decoded.id
            
        })
    } catch (error) {
        console.log(error)
        return response.status(401).json({Error: "Token is invalid!"})
    }

    return next()

}


export default authMiddleware