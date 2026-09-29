const express = require('express');

const Router = express.Router();
const productController = require('../controller/product.controller')

const upload = require('../utils/multer')

Router.post('/products', upload.single('image'), productController.createProduct);
Router.get('/products', productController.geṭAllproducts);

Router.get('/products/:id', productController.getSingleProduct);
Router.put('/products/:id',upload.single('image'), productController.updateProduct);
Router.delete('/products/:id', productController.deleteProduct);

module.exports = Router