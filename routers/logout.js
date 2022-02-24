const logout = require('../controllers/logout');

const logoutRouter = require('express').Router();

logoutRouter.get('/', logout);

module.exports = logoutRouter;