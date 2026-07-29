import * as Yup from 'yup'
import Category from '../models/Category.js'

class CategoryController{
    async store(request, response){

        const schema = Yup.object({
            name: Yup.string().required(),
            path: Yup.string(),
        })

        try {
            schema.validateSync(request.body, {abortEarly: false, strict: true})
       } catch (err) {
         return response.status(400).json({error: err.errors})
       }

       const {name, path} = request.body
       const {filename} = request.file

       const existingCategory = await Category.findOne({
            where: {
                name,
            }
       })

       if(existingCategory) return response.status(400).json({error: 'Category already exists!'})
       

       const newCategory = await Category.create({
            name,
            path: filename,
       })


        return response.status(201).json(newCategory)
    }

    async update(request, response){

        const schema = Yup.object({
            name: Yup.string(),
        })

        try {
            schema.validateSync(request.body, {abortEarly: false, strict: true})
       } catch (err) {
         return response.status(400).json({error: err.errors})
       }

       const {name} = request.body
       const {id} = request.params

       const existingCategory = await Category.findOne({
            where: {
                name,
            }
       })

       if(existingCategory) return response.status(400).json({error: 'Category already exists!'})
       

       const updateCategory = await Category.update({
            name,
       },{
            where:{
                id
            }
       })


        return response.status(200).json({Message: 'Record successfuly updated!'})
    }
    
    async index(request, response){
        const categories = await Category.findAll()

        return response.status(200).json(categories)
    }
}

export default new CategoryController()