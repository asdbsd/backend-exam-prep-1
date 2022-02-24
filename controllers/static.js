const homeController = (req, res) => {
    res.render('index', { title: 'Home Page'});
}

module.exports = {
    homeController
}