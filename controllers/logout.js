const logout = (req, res) => {
    req.auth.logout();
    res.redirect('/');
}

module.exports = logout;