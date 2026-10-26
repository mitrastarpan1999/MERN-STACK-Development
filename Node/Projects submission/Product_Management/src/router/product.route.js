const express = require("express");
const multer = require("multer");
const product = require("../models/product.model");

const Router = express.Router();

const productController = require("../controller/product.controller");
const upload = require("../utils/multer");

const uploadImages = (page, title) => (req, res, next) => {
  upload.array("image", 5)(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        if (page === "editProduct") {
          const data = await product.findById(req.params.id);
          return res.status(400).render(page, {
            title,
            message: "Sorry, You cannot upload more than 5 images.",
            data,
          });
        }

        return res.status(400).render(page, {
          title,
          message: "Sorry, You cannot upload more than 5 images.",
          data: "",
        });
      }
    }

    if (error) return next(error);
    next();
  });
};

Router.get("/create", productController.createPage);

Router.post(
  "/create",
  uploadImages("createProduct", "Create page"),
  productController.createProduct,
);

Router.get("/edit/:id", productController.editPage);
Router.post(
  "/edit/:id",
  uploadImages("editProduct", "Edit page"),
  productController.update,
);
Router.post("/createProduct/:id", productController.softDelete);


Router.get("/recyclebin", productController.recycleBin);
Router.post("/softDelete/:id", productController.softDelete);
Router.post("/restore/:id", productController.restore);
Router.post("/hardDelete/:id", productController.hardDelete);
Router.get("/productDetails/:id", productController.productDetails);

module.exports = Router;
