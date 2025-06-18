const AuthService = require('../services/user.services');
const Student = require('../models/user.model');
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { first_name, last_name, email, password } = req.body;
    try {
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already registered' });
        }
        const hashPassword = await AuthService.hashPassword(password);
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashPassword
        });
        const savedUser = await newUser.save();
        const token = AuthService.generateAuthToken(newUser);
        res.status(201).json({
            msg: 'Registered Successfully'
        }, token);
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
}

module.exports = {
    registerUser,
}