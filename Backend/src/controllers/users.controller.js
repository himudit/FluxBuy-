const AuthService = require('../services/user.services');
const User = require('../models/user.model');
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {
    try {
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        const { first_name, last_name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
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
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,        // use only with HTTPS
            sameSite: "Strict",  // or "Lax"
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            msg: 'Registered Successfully'
        });
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error', error: err });
    }
}

const loginUser = async (res, req) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await AuthService.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = AuthService.generateAuthToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,        // use only with HTTPS
            sameSite: "Strict",  // or "Lax"
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    registerUser,
    loginUser
}