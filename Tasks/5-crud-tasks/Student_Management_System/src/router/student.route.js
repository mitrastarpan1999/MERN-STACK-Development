const express = require('express');

const Router = express.Router();

const homeController = require('../controller/home.controller');
const studentController = require('../controller/student.controller');
const upload = require('../utils/multer')

Router.get('/', homeController.home);

Router.post('/create/student', upload.single('image'), studentController.createStudent)
Router.get('/student', studentController.getStudent)
Router.get('/student/:id', studentController.getSingleStudent)

Router.put('/update/student/:id', upload.single('image'), studentController.updateStudent)
Router.delete('/delete/student/:id', studentController.deleteStudent)

module.exports = Router