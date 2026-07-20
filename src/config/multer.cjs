const multer = require('multer')
const {resolve} = require ('node:path')
const { v4 } = require('uuid')

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..','..','uploads'),
        filename: (request, file, callback) => {
            const uniqueNameFile = v4().concat(`-${file.originalname}`)
            return callback(null, uniqueNameFile)
        }
    })
}