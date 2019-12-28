const Post = require('../models/postModal');
const postService = require('../services/postService');

const postController = {
    getPosts : (req,res,next) => {
        postService.getpost().then((posts) => {
            console.log(posts);
            res.status(200).json({
                data: posts ? posts : [],
                message: 'posts found'
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'error'
            });
        });
    },
    getPost : (req, res, next ) => {
        console.log(req.params.id);
        postService.getpost(req.params.id).then((post) => {
            res.status(200).json({
                data: post,
                message: 'post found'
            });
        }).catch((err) => {
            res.status(500).json({
                message: 'error'
            });
        });
    },
    createPost : (req,res,next) => {
        let post = req.body;
        postService.createpost(post).then((post)=>{
            res.status(200).json({
                data:post,
                message: 'post created'
            })
        }).catch((err) => {
            
            res.status(500).json({
                message: 'error'
            });
        })
    },
    updatePost : (req, res, next ) => {
        console.log(req.params.id);
        console.log(req.body);
        postService.updatepost(req.params.id, req.body).then((post) => {
            res.status(200).json({
                data: post,
                message: 'post updated'
            });
        }).catch((err) => {
            res.status(500).json({
                message: 'error'
            });
        });
    },
    deletePost : (req, res, next) => {
        postService.deletepost(req.params.id).then((post) => {
            res.status(200).json({
                data: post,
                message: 'post was deleted'
            });
        }).catch((err) => {
            res.status(500).json({
                message: 'error'
            });
        });
    } 
}

module.exports = postController