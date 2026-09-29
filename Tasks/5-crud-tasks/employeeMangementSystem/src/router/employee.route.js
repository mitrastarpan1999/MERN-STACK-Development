const express = require("express");

const homeController = require("../controller/home.controller");
const employeeController = require("../controller/employee.controller");
const Router = express.Router();

const upload = require("../utils/multer");

const fileds = [
  { name: "profileImage", maxCount: 1 },
  {
    name: "resume",
    maxCount: 1,
  },
];

Router.get("/", homeController.home);
Router.post("/employees", upload.fields(fileds), employeeController.createEmployee);
Router.get("/employees", employeeController.getAllemployees);
Router.get("/employees/:id", employeeController.getSingleEmployee);
Router.put("/employees/:id",upload.fields(fileds), employeeController.updateEmployee);
Router.delete("/employees/:id", employeeController.deleteEmployee);

module.exports = Router;
