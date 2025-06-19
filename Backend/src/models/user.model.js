const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String, // or Number if preferred
        required: false,
        match: [/^[0-9]{10}$/, 'Mobile number must be 10 digits']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    }
}, {
    timestamps: true,
    strict: true // ensures no extra fields are saved
});

module.exports = mongoose.model('User', userSchema);