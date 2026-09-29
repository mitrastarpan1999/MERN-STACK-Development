const express = require('express');
require('dotenv').config();
const dbconnect = require('./src/config/dbCon')

const app = express();
dbconnect();

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;

const homeRoute = require('./src/route/home.route');
const productRoute = require('./src/route/product.route')



app.use(homeRoute);


app.use('/api', productRoute)


app.listen(port, ()=> {
    console.log(`Your server is running on http://localhost:${port}/`);
    
})