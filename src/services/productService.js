const cloudinary = require('../config/cloudinaryConfig')
const ProductRepository = require('../repositories/productRepository')
const fs = require('fs/promises')
const InternalServerError = require('../utils/internalServerError')
const NotFoundError = require('../utils/notFoundError')
async function createProduct(productDetails){
     //1. We should check if an image is coming to create the product, then we should first upload it on cloudinary
    const imagePath = productDetails.imagePath
    if(imagePath){
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath)
            var productImage = cloudinaryResponse.secure_url;
            console.log(productImage)
            await fs.unlink(process.cwd()+"/"+imagePath)
        }catch(error){
            console.log(error);
            throw new InternalServerError();
        }
    }
     //2. Then use the url from cloudinary and other product details to add the product in db
    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage : productImage
    })
    console.log(product);
    
    return product;
    
}
async function getProductById(productId){
    const response = await ProductRepository.getProductById(productId)
    if(!response){
        throw new NotFoundError('Product')
    }
    return response;
}
async function deleteProductById(productId){
    const response = await ProductRepository.deleteProductById(productId);
    if(!response){
        throw new NotFoundError('Product')
    }
    return response;
}
module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}