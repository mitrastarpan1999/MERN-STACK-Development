const jobManagementModel = require("../models/jpm.model");
const path = require("path");
const fs = require("fs");

class jobManagementController {
  async createJob(req, res) {
    console.log(req.file);

    try {
      const {
        title,
        description,
        companyName,
        location,
        salary,
        experience,
        employmentType,
        skills,
        qualification,
        applicationDeadline,
      } = req.body;

      if (
        !title ||
        !description ||
        !companyName ||
        !location ||
        !salary ||
        !experience ||
        !employmentType ||
        !skills ||
        !qualification ||
        !applicationDeadline
      ) {
        if (req.file) {
          const filePath = path.join(__dirname, "../../", req.file.path);
          await fs.promises.unlink(filePath);
        }
        return res.status(404).json({
          success: false,
          message: "All fileds are required.",
        });
      }
      const jobs = new jobManagementModel({
        title,
        description,
        companyName,
        location,
        salary,
        experience,
        employmentType,
        skills,
        qualification,
        applicationDeadline,
      });

      if (req.file) {
        jobs.companyLogo = req.file.path;
      }

      const savedJobs = await jobs.save();

      return res.status(201).json({
        success: true,
        message: "Data created successfully",
        data: savedJobs,
      });
    } catch (error) {
      if (req.file) {
        const filePath = path.join(__dirname, "../../", req.file.path);
        await fs.promises.unlink(filePath);
      }
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAlljobs(req, res) {
    try {

      const searchJob = req.query.job;
      const location = req.query.location;
      const experience = req.query.experience;
      const employmentType = req.query.employmentType;

      const query = {}
      if(searchJob) {
        query.title = {
          $regex: searchJob,
          $options: "i",
        }
      }

      if(location) {
        query.location = {
          $regex: location,
          $options: "i",
        }
      }

      if(experience) {
        query.experience = {
          $regex: experience,
          $options: "i",
        }
      }

      if(employmentType) {
        query.employmentType = {
          $regex: employmentType,
          $options: "i"
        }
      }



      const getAlljobs = await jobManagementModel.find(query);
      if (getAlljobs.length === 0) {
        return res.status(400).json({
          success: false,
          message: "There is no data, please add one.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data: getAlljobs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getSinglejob(req, res) {
    try {
      const id = req.params.id;
      const getSingleJob = await jobManagementModel.findById(id);
      if (!getSingleJob) {
        return res.status(400).json({
          success: false,
          message: "There is no id",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data is fetched successfully.",
        data: getSingleJob,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateJob(req, res) {
    try {
      const id = req.params.id;
      const findJobs = await jobManagementModel.findById(id);
      if (!findJobs) {
        if (req.file) {
          const filePath = path.join(__dirname, "../../", req.file.path);
          await fs.promises.unlink(filePath);
        }

        return res.status(400).json({
          success: false,
          message: "There is no id",
        });
      }

      if (req.file) {
        const oldImg = findJobs.companyLogo;
        if (oldImg) {
          const filePath = path.join(__dirname, "../../", oldImg);
          await fs.promises.unlink(filePath);
        }
      }

      const {
        title,
        description,
        companyName,
        location,
        salary,
        experience,
        employmentType,
        skills,
        qualification,
        applicationDeadline,
      } = req.body;

      const updateJobs = {
        title,
        description,
        companyName,
        location,
        salary,
        experience,
        employmentType,
        skills,
        qualification,
        applicationDeadline,
      };

      if (req.file) {
        updateJobs.companyLogo = req.file.path;
      }

      const updatedData = await jobManagementModel.findByIdAndUpdate(
        id,
        updateJobs,
        {
          new: true,
        },
      );

      return res.status(200).json({
        success: true,
        message: "Data is updated successfully",
        data: updatedData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteJob(req, res) {
    try {
      const id = req.params.id;
      const findJob = await jobManagementModel.findById(id);
      if (!findJob) {
        return res.status(400).json({
          success: false,
          message: "There is no id",
        });
      }
      const oldImg = findJob.companyLogo;
      console.log(oldImg);
      
      
        if (oldImg && oldImg !== "logo") {
          const filePath = path.join(__dirname, "../../", oldImg);
          await fs.promises.unlink(filePath);
        }
 

      await jobManagementModel.findByIdAndDelete(id);

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

module.exports = new jobManagementController();
