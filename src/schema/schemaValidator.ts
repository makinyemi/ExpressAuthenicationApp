import { body } from 'express-validator'

const loginSchema = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 8 })
        .withMessage('Username must be at least 8 characters'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Passowrd cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Passowrd must be atleast 8 characters'),
]

const signupSchema = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 8 })
        .withMessage('Username must be at least 8 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Passowrd cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Passowrd must be atleast 8 characters'),
]

export { loginSchema, signupSchema }
