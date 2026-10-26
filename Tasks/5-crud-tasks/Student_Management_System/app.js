const express = require('express');
const path = require('path');
const fs = require('fs')

require('dotenv').config();
const dbConnction = require('./src/config/dbCon')


const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join('uploads', 'image')))


app.set('view engine', 'ejs');

app.set('views', './src/views');

const studentRoute = require('./src/router/student.route');

app.use('/api', studentRoute);

dbConnction();

app.listen(port, ()=> {
    console.log(`Your server is running on http://localhost:${port}/`);
    
})