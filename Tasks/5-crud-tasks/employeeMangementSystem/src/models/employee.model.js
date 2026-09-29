const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: {
    type: String,
  },

  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  department: {
    type: String,
    required: [true, "department is required"],
  },
  designation: {
    type: String,
    required: [true, "designation is required"],
  },
  salary: {
    type: String,
    required: [true, "salary is required"],
  },
  joiningDate: {
    type: String,
    required: [true, "joiningDate is required"],
  },
  profileImage: {
    type: String,
    default: 'Image'
  },
  resume: {
    type: String,
    default: 'CV'
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
},
{
    timestamps: true
});


const employeeModel = mongoose.model('employee', employeeSchema)

module.exports = employeeModel

