const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({

    id: {
        type: mongoose.Schema.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: {
        type: Number
    }
},{
    versionKey: false
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;