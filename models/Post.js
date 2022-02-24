const { Schema, model, Types: { ObjectId } } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: true },
    keyword: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: ObjectId, ref: 'User' },
    votes: { type: [ ObjectId ], default: [], ref: 'User' },
    rating: { type: Number, default: 0 }
});


const Post = model('Post', postSchema);

module.exports = Post