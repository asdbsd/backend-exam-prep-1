const myPostsIndex = require('../controllers/myPosts');
const { isLoggedIn } = require('../middlewares/session');

const myPostsRouter = require('express').Router();

myPostsRouter.get('/',isLoggedIn(), myPostsIndex);

module.exports = myPostsRouter;