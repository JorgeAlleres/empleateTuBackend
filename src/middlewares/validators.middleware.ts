import { body } from "express-validator"

export const registerValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:4}).withMessage('Password too short'),
    body('name').notEmpty().withMessage('Name required'),

]

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:4}).withMessage('Password too short')
]

export const saveOffer = [
    body('title').isLength({min:4}).notEmpty().withMessage('Title required minimum 4 characters'),
    body('contactEmail').isEmail().withMessage('Invalid Email')
]

export const offerValidation = [
    body('title').isLength({min:4, max:40}).withMessage('Title required minimum 4 characters'),
    body('description').optional().isLength({max:2000}),
    body('contactEmail').optional().isEmail().withMessage('Invalid Email'),
    body('published').optional().isISO8601().toDate().withMessage('Incorrect date format'),
    body('expired').isISO8601().toDate().withMessage('Incorrect date format'),
]

export const categoryValidation = [
    body('name').notEmpty().withMessage('Name required'),
]

export const rateValidation = [
    body('value').isInt({min:0,max:5}).toInt().withMessage('Value is required')
]