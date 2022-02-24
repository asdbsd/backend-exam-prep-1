const Post = require('../models/Post');

const getAllPosts = async () => {
    const posts = await Post.find({});
    return posts;
}

const getMyPosts = async (authorId) => {
    const posts = await Post.find({ author: authorId });
    return posts;
}

const getPostById = async (id) => {
    try {
        const post = (await Post.find({ _id: id }))[0];

        if(post) {
            return post
        } else {
            throw new Error('Requested animal doesn\'t exist');
        }
        
    } catch(err) {
        return err;
    }
}

const createPost = async (post) => {
    const newPost = new Post(post);

    try {
        await newPost.save();
    } catch(err) {
        throw err;
    }
}

const editPost = async (post) => {
    const existingPost = await Post.findById(post.id)

    existingPost.title = post.title;
    existingPost.keyword = post.keyword;
    existingPost.location = post.location;
    existingPost.date = post.date
    existingPost.imageUrl = post.imageUrl;
    existingPost.description = post.description

    await existingPost.save();
} 

const deletePost = async (id) => {
    await Post.findByIdAndDelete(id);
}

module.exports = {
    getAllPosts,
    getMyPosts,
    getPostById,
    createPost,
    editPost,
    deletePost
}