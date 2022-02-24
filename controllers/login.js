const loginIndex = (req, res) => {
    res.render('login', { title: 'Login Page' });
};

const login = async (req, res) => {
    try {
        await req.auth.loginUser(req.body.email, req.body.password)
        res.redirect('/');
    } catch(err) {
        res.locals.errors = [{ msg: err }]
        res.render('login', { title: 'Login Page' });
    }
}

module.exports = {
    loginIndex,
    login
}