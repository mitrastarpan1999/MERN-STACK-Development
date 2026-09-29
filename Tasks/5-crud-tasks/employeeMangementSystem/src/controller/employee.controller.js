const employeeModel = require("../models/employee.model");
const path = require("path");
const fs = require("fs");

class employeeController {
  async createEmployee(req, res) {
    console.log(req.files);

    try {
      const {
        employeeId,
        name,
        email,
        phone,
        department,
        designation,
        salary,
        joiningDate,
        address,
      } = req.body;
      if (
        !employeeId ||
        !name ||
        !email ||
        !phone ||
        !department ||
        !designation ||
        !salary ||
        !joiningDate ||
        !address
      ) {
        return res.status(404).json({
          success: false,
          message: "All fields are required",
        });
      }

      const employee = new employeeModel({
        employeeId,
        name,
        email,
        phone,
        department,
        designation,
        salary,
        joiningDate,
        address,
      });

      if (req.files) {
        employee.profileImage = req.files.profileImage[0].path;
        employee.resume = req.files.resume[0].path;
      }

      const savedEmployee = await employee.save();

      return res.status(201).json({
        success: true,
        message: "Data fetched successfully",
        data: savedEmployee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllemployees(req, res) {
    try {
      const search = req.query.search;
      const department = req.query.department;
      const designation = req.query.designation;

      const query = {};

      if (search) {
        query.name = {
          $regex: search,
          $options: "i",
        }
      }

      if (department) {
        query.department = {
          $regex: department,
          $options: "i",
        }
      }


      if (designation) {
        query.designation = {
          $regex: designation,
          $options: "i",
        }
      }
      const getAllEmployees = await employeeModel.find(query);
      if (getAllEmployees.length === 0) {
        return res.status(400).json({
          success: false,
          message: "There is no data, please add one.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data: getAllEmployees,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getSingleEmployee(req, res) {
    try {
      const id = req.params.id;
      const getSingleEmployee = await employeeModel.findById(id);

      if (!getSingleEmployee) {
        return res.status(400).json({
          success: false,
          message: "There is no id",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data: getSingleEmployee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateEmployee(req, res) {
    try {
      const id = req.params.id;
      const findEmployee = await employeeModel.findById(id);
      if (!findEmployee) {
        if (req.files) {
          if (req.files.profileImage) {
            const filePathImage = path.join(
              __dirname,
              "../../",
              req.files.profileImage[0].path,
            );

            await fs.promises.rm(filePathImage);
          }

          if (req.files.resume) {
            const filePathResume = path.join(
              __dirname,
              "../../",
              req.files.resume[0].path,
            );

            await fs.promises.rm(filePathResume);
          }
        }

        return res.status(400).json({
          success: false,
          message: "There is no id",
        });
      }
      if (req.files) {
        if (req.files.profileImage) {
          const oldImg = findEmployee.profileImage;
          if (oldImg) {
            const filePath = path.join(__dirname, "../../", oldImg);
            await fs.promises.rm(filePath);
          }
        }

        if (req.files.resume) {
          const oldPDF = findEmployee.resume;
          if (oldPDF) {
            const filePath = path.join(__dirname, "../../", oldPDF);
            await fs.promises.rm(filePath);
          }
        }
      }

      const {
        employeeId,
        name,
        email,
        phone,
        department,
        designation,
        salary,
        joiningDate,
        address,
      } = req.body;
      const updateEmployee = {
        employeeId,
        name,
        email,
        phone,
        department,
        designation,
        salary,
        joiningDate,
        address,
      };

      if (req.files) {
        if (req.files.profileImage) {
          updateEmployee.profileImage = req.files.profileImage[0].path;
        }
        if (req.files.resume) {
          updateEmployee.resume = req.files.resume[0].path;
        }
      }

      const finalUpdate = await employeeModel.findByIdAndUpdate(
        id,
        updateEmployee,
        { new: true },
      );
      return res.status(200).json({
        success: true,
        message: "Data is updated successfully",
        data: finalUpdate,
      });
    } catch (error) {

      if (req.files) {
        if (req.files.profileImage) {
          const filePathImage = path.join(
            __dirname,
            "../../",
            req.files.profileImage[0].path,
          );

          await fs.promises.rm(filePathImage);
        }

        if (req.files.resume) {
          const filePathResume = path.join(
            __dirname,
            "../../",
            req.files.resume[0].path,
          );

          await fs.promises.rm(filePathResume);
        }
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteEmployee(req, res) {
    const id = req.params.id;
    const findEmployee = await employeeModel.findById(id);
    if (!findEmployee) {
      return res.status(400).json({
        success: false,
        message: 'There is no id'
      })
    }

    if (findEmployee.profileImage) {
      const filePath = path.join(__dirname, '../../', findEmployee.profileImage);
      await fs.promises.rm(filePath)
    }

    if (findEmployee.resume) {
      const filePath = path.join(__dirname, '../../', findEmployee.resume);
      await fs.promises.rm(filePath)
    }

    await employeeModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Data deleted successfully'
    })

  }
}

module.exports = new employeeController();
