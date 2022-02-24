const { loginIndex, login } = require('../controllers/login');

const loginRouter = require('express').Router();

loginRouter.get('/', loginIndex);
loginRouter.post('/', login)

module.exports = loginRouter;