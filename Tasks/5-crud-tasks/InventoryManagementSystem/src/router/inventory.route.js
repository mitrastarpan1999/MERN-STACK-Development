const homeController = require('../controller/home.controller');
const inventoryController = require('../controller/inventory.controller')
const upload = require('../utils/multer')
const express = require('express');

const Router = express.Router();

Router.get('/', homeController.home);

Router.post('/inventory', upload.single('image'), inventoryController.createInventory);
Router.get('/inventory',  inventoryController.getAllInventory);
Router.get('/inventory/:id',  inventoryController.getSingleInventory);
Router.put('/inventory/:id', upload.single('image'), inventoryController.updateInventory);
Router.delete('/inventory/:id',  inventoryController.deleteInventory);


module.exports = Router