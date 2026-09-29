const express = require("express");

require("dotenv").config();
const path = require("path");

const app = express();

const dbConnection = require("./src/config/dbCon");

dbConnection();

const port = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.set("views", "./src/views");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

const employeeRoute = require("./src/router/employee.route");

app.use("/api", employeeRoute);

app.listen(port, () => {
  console.log(`Your server is running on: http://localhost:${port}/`);
});
