const router = express.Router();
const express = require('express');
const { body, validationResult } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 6 chars'),
    body('first_name').isLength({ min: 3 }).withMessage('First Name must be atleast 3 characters long'),
],
    registerUser
);


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
],
    loginUser
);


router.get('/profile', authUser,
    getUserProfile
);


router.post('/logout', logoutUser
);

export default router;