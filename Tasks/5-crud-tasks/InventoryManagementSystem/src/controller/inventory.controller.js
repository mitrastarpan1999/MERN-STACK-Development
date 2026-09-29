const inventoryModel = require("../models/inventory.model");
const path = require("path");
const fs = require("fs");

class inventoryController {
  async createInventory(req, res) {
    console.log(req.file);

    try {
      const {
        itemName,
        sku,
        description,
        category,
        supplier,
        purchasePrice,
        sellingPrice,
        quantity,
        warehouseLocation,
      } = req.body;
      if (
        !itemName ||
        !sku ||
        !description ||
        !category ||
        !supplier ||
        !purchasePrice ||
        !sellingPrice ||
        !quantity ||
        !warehouseLocation
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const inventory = new inventoryModel({
        itemName,
        sku,
        description,
        category,
        supplier,
        purchasePrice,
        sellingPrice,
        quantity,
        warehouseLocation,
      });
      if (req.file) {
        inventory.image = req.file.path;
      }
      const saveInventory = await inventory.save();

      return res.status(201).json({
        success: true,
        message: "Data fetched successfully",
        data: saveInventory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllInventory(req, res) {
    try {

      const search = req.query.search;
      const category = req.query.category;
      const query = {};

      if(search) {
        query.itemName = {
          $regex: search,
          $options: "i",
        }
      }

      if(category){
        query.category = {
          $regex: category,
          $options: "i",
        }
      }

      const getAllInventory = await inventoryModel.find(query);
        
        
      if (getAllInventory.length === 0) {
        return res.status(400).json({
          success: false,
          message: "There is no data",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data fecthed successfully",
        data: getAllInventory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getSingleInventory(req, res) {
    try {
      const id = req.params.id;
      const getSingleStudent = await inventoryModel.findById(id);
      console.log(getSingleStudent);

      if (!getSingleStudent) {
        return res.status(400).json({
          success: false,
          message: "There is no id.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data fecthed successfully",
        data: getSingleStudent,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateInventory(req, res) {
    try {
      const id = req.params.id;
      const findInventory = await inventoryModel.findById(id);
      if (!findInventory) {
        if (req.file) {
          const filePath = path.join(__dirname, "../../", req.file.path);
          await fs.promises.rm(filePath);

          return res.status(400).json({
            success: false,
            message: "There is no id.",
          });
        }
      }

      if (req.file) {
        const oldImg = findInventory.image;
        if (oldImg) {
          const filePath = path.join(__dirname, "../../", oldImg);
          await fs.promises.rm(filePath);
        }
      }
      const {
        itemName,
        sku,
        description,
        category,
        supplier,
        purchasePrice,
        sellingPrice,
        quantity,
        warehouseLocation,
      } = req.body;

      const updateData = {
        itemName,
        sku,
        description,
        category,
        supplier,
        purchasePrice,
        sellingPrice,
        quantity,
        warehouseLocation,
      };

      if (req.file) {
        updateData.image = req.file.path;
      }

      const updateInventory = await inventoryModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: updateInventory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteInventory(req, res) {
    try {
      const id = req.params.id;
      const findInventory = await inventoryModel.findById(id);
      if (!findInventory) {
        return res.status(400).json({
          success: false,
          message: "There is no id",
        });
      }

      const oldImg = findInventory.image;
    
        if (oldImg && oldImg !== 'Image') {
        const filePath = path.join(__dirname, "../../", oldImg);
        await fs.promises.rm(filePath);
      }
      

      
      

      await inventoryModel.findByIdAndDelete(id);

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

module.exports = new inventoryController();
