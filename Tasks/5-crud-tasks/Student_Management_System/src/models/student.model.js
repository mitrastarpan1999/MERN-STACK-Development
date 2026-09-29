const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Gender is required']
    },
    course: {
        type: String,
        required: [true, 'Course is required']
    },
    department: {
        type: String,
        required: [true, 'Department is required']
    },
    registrationNumber: {
        type: String,
        required: [true, 'Registration number is required'],
        unique: true
    },
    profileImage: {
        type: String,
        default: 'https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    status: {
        type: String,
        default: 'Active'
    }
}, {
    timestamps: true
});

const Student = mongoose.model('StudentNew', studentSchema);

module.exports = Student;