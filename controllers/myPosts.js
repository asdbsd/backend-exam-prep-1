const myPostsIndex = async (req, res) => {
    const posts = JSON.parse(JSON.stringify((await req.storage.getMyPosts(req.session.user.id))))
    res.locals.posts = posts;
    res.render('my-posts', { title: 'My Posts' })
}

module.exports = myPostsIndex;