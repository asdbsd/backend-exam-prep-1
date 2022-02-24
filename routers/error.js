const errorIndex = require('../controllers/error');

const errorRouter = require('express').Router();

errorRouter.get('*', errorIndex);

module.exports = errorRouter;