import * as Yump from "yup"
import Product from "../models/Product.js"
import Category from "../models/Category.js"
import Order from "../schemas/order.js"

class OrderController{
    async store(request, response){
        
        const schema = Yump.object({
           products: Yump.array().of(Yump.object({
                id: Yump.number().required(),
                quantity: Yump.number().required().min(1),
                })).min(1,"The order must contain at least one product.")
                   .required("The products are mandatory."),
        }) 

        try {
            schema.validateSync(request.body, {abortEarly: false, strict: true})
        } catch (err) {
         return response.status(400).json({error: err.errors})
        } 

       const {userId, userName} = request
       const {products} = request.body

       const productsId = products.map(product => product.id)

       
       const findedProducts = await Product.findAll({
           where: {
               id: productsId
            },
            include: {
                model: Category,
                as: 'category',
                attributes: ['name'],
            }

        })

        const mapedProducts = findedProducts.map(product => {

            const quantity = products.find(p => p.id === product.id).quantity

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                url: product.url,
                category: product.category.name,
                quantity,
            }
            
            return newProduct
        })

       const order = {
            user: {
                id: userId,
                name: userName,
            },
            products: mapedProducts,
            status: "Pedido Realizado"
       }

       const newOrder = await Order.create(order)

        return response.status(201).json(newOrder)
    }
}

export default new OrderController()