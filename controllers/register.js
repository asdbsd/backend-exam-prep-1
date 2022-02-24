const { validationResult } = require('express-validator');

const registerIndex = (req, res) => {
    res.render('register', { title: 'Register Page' })
};

const register = async (req, res) => {
    const { errors } = validationResult(req);

    try {
        if (errors.length > 0) {
            throw errors;
        }

        await req.auth.registerUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
        res.redirect('/');

    } catch (err) {
        data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }

        err.forEach(e => {
            if(data.hasOwnProperty(e.param)) {
                delete data[e.param]
            }
        });

        res.locals.errors = err;
        res.locals.data = data;
        res.render('register', { title: 'Register Page' })
    }

};

module.exports = {
    registerIndex,
    register
}