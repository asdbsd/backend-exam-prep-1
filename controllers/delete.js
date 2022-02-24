const del = (req, res) => {
    req.storage.deletePost(req.params.id);
    res.redirect('/all-posts');
} 

module.exports = {
    del
}