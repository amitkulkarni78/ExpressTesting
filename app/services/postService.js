const Post = require('../models/postModal');
const postService = {
    getposts : ()=>{
        return new Promise((resolve, reject) => {
            Post.find((err, posts) => {
                if(err) {
                    reject(err.errors.title.message);        
                } else {
                    resolve(posts);
                }
            });
        });    
    },
    getpost : (id)=>{
        return new Promise((resolve, reject) => {
            Post.findById(id,(err, post) => {
                if(err) {
                    reject(err);        
                } else {
                    resolve(post);
                }
            });
        });    
    },
    createpost: (post)=>{
        return new Promise((resolve, reject) => {
            Post.create(post, (err, post) => {
                if(err){
                    reject(err);
                } else {
                    resolve(post);
                }
            });
        });
    },
    updatepost: (id,post)=>{
        return new Promise((resolve, reject) => {
            Post.findByIdAndUpdate(id,post, {new: true}, (err, post) => {
                if(err){
                    reject(err);
                } else {
                    resolve(post);
                }
            });
        });
    },
    deletepost: (id)=>{
        return new Promise((resolve, reject) => {
            Post.findByIdAndDelete(id, (err, post) => {
                if(err){
                    reject(err);
                } else {
                    resolve(post);
                }
            });
        });
    }
}

module.exports = postService;