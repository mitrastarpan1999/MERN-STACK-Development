const express = require("express");
require("dotenv").config();
const path = require("path");
const cloudinary = require("cloudinary").v2;

const app = express();

const dbConnection = require("./src/config/dbConfig");

const port = process.env.PORT || 3000;

dbConnection();
app.set("view engine", "ejs");

app.set("views", "./src/views");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

const homeRoute = require("./src/router/home.route");
const productRoute = require("./src/router/product.route");
app.use(homeRoute);

app.use( productRoute);

app.listen(port, () => {
  console.log(`Your server is running on: http://localhost:${port}/`);
});
