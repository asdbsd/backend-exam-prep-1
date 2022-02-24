const errorIndex = (req, res) => {
    res.render('404', { title: 'Page doesn\'t exist' });
}

module.exports = errorIndex;