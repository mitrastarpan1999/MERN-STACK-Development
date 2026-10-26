const productModel = require("../models/products.model");
const path = require("path");
const fs = require("fs");

class productController {
  async createProduct(req, res) {
    console.log(req.file);

    try {
      const { name, description, price, category, brand, stock } = req.body;
      if (!name || !description || !price || !category || !brand || !stock) {

        if(req.file) {
          const fiePath = path.join(__dirname, '../../', req.file.path);
          await fs.promises.rm(fiePath)
        }
        return res.status(404).json({
          success: false,
          message: "Please fill all the fileds",
        });
      }

      const product = new productModel({
        name,
        description,
        price,
        category,
        brand,
        stock,
      });

      if (req.file) {
        product.image = req.file.path;
      }

      const savedProduct = await product.save();

      return res.status(201).json({
        success: true,
        message: "Data fetched succesfully",
        data: savedProduct,
      });
    } catch (error) {
      if(req.file) {
          const fiePath = path.join(__dirname, '../../', req.file.path);
          await fs.promises.rm(fiePath)
        }
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async geṭAllproducts(req, res) {
    try {
      const getProducts = await productModel.find();
      if (getProducts.length === 0) {
        return res.status(400).json({
          success: false,
          message: "There is no product to show, please add one.",
        });
      }

      const searchProduct = req.query.search;
      const categoryProduct = req.query.category;

      if (searchProduct === undefined && categoryProduct === undefined) {
        return res.status(200).json({
          success: true,
          message: "Data fetched successfully",
          data: getProducts,
        });
      } else if (categoryProduct === undefined) {
        const searchData = await productModel.find({
          name: { $regex: searchProduct, $options: "i" },
        });

        console.log(searchData);

        if (searchData.length >= 1) {
          return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: searchData,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid search",
          });
        }
      } else if (searchProduct === undefined) {
        const filterData = await productModel.find({
          category: { $regex: categoryProduct, $options: "i" },
        });

        if (filterData.length > 0) {
          return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: filterData,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid search",
          });
        }
      } else {
        const bothData = await productModel.find({
          name: { $regex: searchProduct, $options: "i" },
          category: { $regex: categoryProduct, $options: "i" },
        });

        console.log(bothData);
        
        if (bothData.length > 0) {
          return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: bothData,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid search",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getSingleProduct(req, res) {
    try {
      const id = req.params.id;
      const getSingleProduct = await productModel.findById(id);
      if (!getSingleProduct) {
        return res.status(400).json({
          success: false,
          message: `There is no id called ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data: getSingleProduct,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const findProduct = await productModel.findById(id);
      if (!findProduct) {
        if (req.file) {
          const filePath = path.join(__dirname, "../../", req.file.path);
          await fs.promises.rm(filePath);
        }

        return res.status(400).json({
          success: false,
          message: `There is no id called ${id}`,
        });
      }

      if (req.file) {
        const oldImg = findProduct.image;
        if (oldImg) {
          const filePath = path.join(__dirname, "../../", oldImg);
          await fs.promises.rm(filePath);
        }
      }

      const { name, description, price, category, brand, stock } = req.body;
      const updateProduct = {
        name,
        description,
        price,
        category,
        brand,
        stock,
      };

      if (req.file) {
        updateProduct.image = req.file.path;
      }

      const finalUpdate = await productModel.findByIdAndUpdate(
        id,
        updateProduct,
        { new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: finalUpdate,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const findProduct = await productModel.findById(id);
      if (!findProduct) {
        return res.status(400).json({
          success: false,
          message: "There is no id",
        });
      }

      if (findProduct.image) {
        const filePath = path.join(__dirname, "../../", findProduct.image);

        await fs.promises.rm(filePath);
      }

      await productModel.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Data is deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new productController();
