const jobController = require('../controller/jpm.controller');

const express = require('express');

const Router = express.Router();

const upload = require('../utils/multer');

Router.post('/jobs', upload.single('companyLogo'), jobController.createJob)
Router.get('/jobs',  jobController.getAlljobs)
Router.get('/jobs/:id',  jobController.getSinglejob)
Router.put('/jobs/:id', upload.single('companyLogo'), jobController.updateJob)
Router.delete('/jobs/:id',  jobController.deleteJob)






module.exports = Router