const { getAllPosts, getPostById, createPost, editPost, deletePost, getMyPosts } = require('../services/postService');

const postMiddleware = () => {
    return (req, res, next) => {
        req.storage = {
            getAllPosts,
            getMyPosts,
            getPostById,
            createPost,
            editPost,
            deletePost
        };

        next();
    }
}

module.exports = postMiddleware;