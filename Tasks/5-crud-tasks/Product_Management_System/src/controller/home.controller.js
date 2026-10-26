const ProductModel = require("../models/products.model");

class homeController {


    async home(req, res) {
        const products = await ProductModel.find();
        console.log(products);
        
        return res.render('home', {
            title: 'Home',
            data: products,
            message: ""
        })
    }
}

module.exports = new homeController()