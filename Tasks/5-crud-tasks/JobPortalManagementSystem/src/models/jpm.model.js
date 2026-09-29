const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobManagementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    companyLogo: {
      type: String,
      default: "logo",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    salary: {
      type: Number,
      required: [true, "Location is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience requirement is required"],
    },
    employmentType: {
      type: String,
      required: [true, "Employment type is required"],
    },
    skills: {
      type: Array,
      default: [],
    },
    qualification: {
      type: String,
    },
    applicationDeadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    status: {
      type: String,

      default: "Available",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model("Job", jobManagementSchema);

module.exports = Job;
