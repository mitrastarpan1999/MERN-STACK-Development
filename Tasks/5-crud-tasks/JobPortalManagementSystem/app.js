const express = require("express");
require("dotenv").config();

const app = express();
const path = require("path");
const dbConnection = require('./src/config/dbCon')

const port = process.env.PORT || 3000;

dbConnection()

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views');

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

const jobManagementRoute = require('./src/router/jpm.route');

app.use('/api', jobManagementRoute);


app.listen(port, ()=> {
    console.log(`Your server is running on http://localhost:${port}/api`);
    
})