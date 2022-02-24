const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const userMiddleware = require('./middlewares/userMiddleware');
const postMiddleware = require('./middlewares/postMiddleware');

const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');
const postsRouter = require('./routers/posts');
const registerRouter = require('./routers/register');
const { staticRouter } = require('./routers/static');
const errorRouter = require('./routers/error');
const myPostsRouter = require('./routers/myPosts');

const app = express();

// App config
app.engine('.hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

app.use(session({
    secret: 'secretString',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

// Middlewares
app.use(userMiddleware());
app.use(postMiddleware());

// Routes config
app.use(express.urlencoded({ extended: true }));
app.use('*/static', express.static('static'));

app.use('/', staticRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/all-posts', postsRouter);
app.use('/my-posts', myPostsRouter);
app.use('*', errorRouter);


module.exports = app;
