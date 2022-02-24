const { validationResult, body } = require('express-validator');

const postsIndex = async (req, res) => {
    res.locals.posts = (await req.storage.getAllPosts()).map(p => JSON.parse(JSON.stringify(p)));
    res.render('all-posts', { title: 'All Posts' });
};

const createIndex = (req, res) => {
    res.render('create', { title: 'Create Page' });
};

const create = async (req, res) => {
    const { errors } = validationResult(req);

    try {
        if (errors.length > 0) {
            throw errors;
        }

        const userId = req.session.user.id
        const post = {
            title: req.body.title,
            keyword: req.body.keyword,
            location: req.body.location,
            date: req.body.date,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            author: userId,
        }
        await req.storage.createPost(post)
        res.redirect('/all-posts');
    } catch (err) {
        res.locals.errors = err
        res.render('create', { title: 'Create Page' });
    }
};

const postDetails = async (req, res) => {
    const post = JSON.parse(JSON.stringify((await req.storage.getPostById(req.params.id))));
    const user = JSON.parse(JSON.stringify((await req.auth.getUserById(post.author))));

    if(req.session.user && req.session.user.id == post.author) {
        res.locals.isOwner = true
    } else if(req.session.user && post.votes.includes(req.session.user.id) == true) {
        res.locals.isLogged = true
        res.locals.isVotable = false
    } else if(req.session.user && post.votes.includes(req.session.user.id) == false) {
        res.locals.isLogged = true
        res.locals.isVotable = true
    }

    if(post.votes.length > 0) {
        const userEmails = []
        for(let id of post.votes) {
            const user = JSON.parse(JSON.stringify((await req.auth.getUserById(id))))
            userEmails.push(user.email);
        }
        res.locals.emails = userEmails.join(', ');
    }
    res.locals.owner = user.firstName + ' ' + user.lastName;
    res.locals.post = post;
    res.render('details', { title: `${post.title} Page`});
}

const editIndex = async (req, res) => {
    const post = JSON.parse(JSON.stringify((await req.storage.getPostById(req.params.id))));
    res.locals.post = post;
    res.render('edit', { title: `Edit ${post.title}`})
}

const edit = async (req, res) => {
    const post = JSON.parse(JSON.stringify((await req.storage.getPostById(req.params.id))));

    if(req.session.user.id == post.author) {
        const updatedPost = {
            id: post._id,
            title: req.body.title,
            keyword: req.body.keyword,
            location: req.body.location,
            date: req.body.date,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            votes: post.votes,
            rating: post.rating,
            author: post.author
        }
        try {
            await req.storage.editPost(updatedPost);
            res.redirect(`/all-posts/${req.params.id}`);
        } catch(err) {
            res.locals.post = post;
            res.render('edit', { title: `Edit ${post.title}`})
        }
    } else {
        res.redirect('/all-posts');
    }

}

const upvote = async (req, res) => {
    const post = await req.storage.getPostById(req.params.id)
    post.rating++;
    post.votes = JSON.parse(JSON.stringify(post.votes));
    post.votes.push(req.session.user.id)
    try {
        await post.save();
        res.redirect(`/all-posts/${req.params.id}`)
    } catch(err) {
        res.locals.errors = [{ msg: 'There was a problem with your vote, please try again!'}]
        res.redirect(`/all-posts/edit/${req.params.id}`)
    }
}

const downvote = async (req, res) => {
    const post = await req.storage.getPostById(req.params.id)
    post.rating--;
    post.votes = JSON.parse(JSON.stringify(post.votes));
    post.votes.push(req.session.user.id)
    try {
        await post.save();
        res.redirect(`/all-posts/${req.params.id}`)
    } catch(err) {
        res.locals.errors = [{ msg: 'There was a problem with your vote, please try again!'}]
        res.redirect(`/all-posts/${req.params.id}`)
    }
}

module.exports = {
    postsIndex,
    createIndex,
    create,
    postDetails,
    editIndex,
    edit,
    upvote,
    downvote
}