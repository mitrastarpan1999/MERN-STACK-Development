const studentModel = require("../models/student.model");
const fs = require("fs");
const path = require("path");

class studentController {
  async createStudent(req, res) {
    try {
      const {
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        course,
        department,
        registrationNumber,
        address,
        
      } = req.body;

      if (
        !name ||
        !email ||
        !phone ||
        !dateOfBirth ||
        !gender ||
        !course ||
        !department ||
        !registrationNumber ||
        !address
      ) {
        if (req.file) {
          const filePath = path.join(__dirname, "../../", req.file.path);
          await fs.promises.rm(filePath);
        }

        return res.status(400).json({
          success: false,
          message: "All required fields must be provided",
        });
      }

      const student = new studentModel({
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        course,
        department,
        registrationNumber,
        address,
      });

      if (req.file) {
        student.profileImage = req.file.path;
      }

      const savedStudent = await student.save();

      return res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: savedStudent,
      });
    } catch (error) {
      if (req.file) {
        const filePath = path.join(__dirname, "../../", req.file.path);
        await fs.promises.rm(filePath);
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getStudent(req, res) {
    try {
      const search = req.query.search;
      const course = req.query.course;
      const department = req.query.department;
      

      const query = {};

      if (search) {
        query.name = {
          $regex: search, 
          $options: "i",
        }
          
      }

      if (course) {
        query.course = {
          $regex: course,
          $options: "i",
        };
      }

      if (department) {
        query.department = {
          $regex: department,$options: "i",
        };
      }

    
      console.log(query);
      
      const getAllStudent = await studentModel.find(query);

      if (getAllStudent.length === 0) {
        return res.status(404).json({
          success: false,
          message: "There is no data, please add one.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data is fetched successfully",
        data: getAllStudent,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getSingleStudent(req, res) {
    try {
      const id = req.params.id;

      const getSingleStudent = await studentModel.findById(id);

      if (!getSingleStudent) {
        return res.status(404).json({
          success: false,
          message: "There is no id",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data is fetched successfully",
        data: getSingleStudent,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const id = req.params.id;

      const findStudent = await studentModel.findById(id);

      if (!findStudent) {
        if (req.file) {
          const filePath = path.join(__dirname, "../../", req.file.path);
          await fs.promises.rm(filePath);
        }

        return res.status(400).json({
          success: false,
          message: `There is no id named ${id}`,
        });
      }

      if (req.file) {
        const oldImg = findStudent.profileImage;

        if (oldImg) {
          const filePath = path.join(__dirname, "../../", oldImg);
          await fs.promises.rm(filePath);
        }
      }

      const {
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        course,
        department,
        registrationNumber,
        address,
        
      } = req.body;

      const updateData = {
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        course,
        department,
        registrationNumber,
        address,
     
      };

      if (req.file) {
        updateData.profileImage = req.file.path;
      }

      const updateStudent = await studentModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Data is updated successfully",
        data: updateStudent,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const id = req.params.id;

      const findStudent = await studentModel.findById(id);

      if (!findStudent) {
        return res.status(400).json({
          success: false,
          message: "There is no id",
        });
      }

      if (findStudent.profileImage) {
        const filePath = path.join(__dirname, "../../", findStudent.profileImage);
        await fs.promises.rm(filePath);
      }

      await studentModel.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Data is successfully deleted.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new studentController();