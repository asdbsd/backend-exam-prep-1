const { homeController } = require('../controllers/static');
const { isLoggedIn } = require('../middlewares/session');

const staticRouter = require('express').Router();

staticRouter.get('/', homeController);

module.exports = {
    staticRouter
}