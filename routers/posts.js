const postsRouter = require('express').Router();
const { body } = require('express-validator');
const { isLoggedIn } = require('../middlewares/session');

const { postsIndex, createIndex, create, postDetails, upvote, downvote, edit, editIndex } = require('../controllers/posts');
const { del } = require('../controllers/delete');

postsRouter.get('/', postsIndex);

postsRouter.get('/create', isLoggedIn(), createIndex);
postsRouter.post('/create', isLoggedIn(),
    body('title')
        .notEmpty().withMessage('Title can\'t be blank'),
    body('keyword')
        .notEmpty().withMessage('Keyword can\'t be blank'),
    body('location')
        .notEmpty().withMessage('Location can\'t be blank'),
    body('date')
        .notEmpty().withMessage('Date can\'t be blank'),
    body('imageUrl')
        .notEmpty().withMessage('Image Url can\'t be blank'),
    body('description')
        .notEmpty().withMessage('Description can\'t be blank'),
    create);

postsRouter.get('/:id', postDetails);

postsRouter.get('/edit/:id', isLoggedIn(), editIndex);
postsRouter.post('/edit/:id', isLoggedIn(), edit)

postsRouter.get('/upvote/:id', isLoggedIn(), upvote);
postsRouter.get('/downvote/:id', isLoggedIn(), downvote);

postsRouter.get('/delete/:id', isLoggedIn(), del);

module.exports = postsRouter;