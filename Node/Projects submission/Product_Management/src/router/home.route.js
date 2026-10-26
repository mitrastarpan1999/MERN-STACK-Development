

const express = require('express')

const Router = express.Router()

const homeController = require('../controller/home.controller')

Router.get('/', homeController.home)


module.exports = Router