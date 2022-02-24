const { registerIndex, register } = require("../controllers/register");
const { body } = require('express-validator');

const registerRouter = require('express').Router();

registerRouter.get('/', registerIndex)
registerRouter.post('/',
    body('firstName')
        .isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long!')
        .isAlpha().withMessage('First Name must consist only of EN characters'),
    body('lastName')
        .isLength({ min: 5 }).withMessage('Last Name must be at least 5 characters long!')
        .isAlpha().withMessage('Last Name must consist only of EN characters'),
    body('email')
        .isEmail().withMessage('Please make sure to use a valid email!'),
    body('password')
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long!')
        .custom((value, { req }) => {
            return value === req.body.repass
        }).withMessage('Passwords doesn\'t match'), register)

module.exports = registerRouter;