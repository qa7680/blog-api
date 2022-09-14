const Post = require('../models/post');

//create post
exports.create_blog_post = (req, res, next) => {
    //create new post
    const post = new Post({
        title: req.body.title,
        blogText: req.body.blogText,
        published: req.body.published
    });
    post.save((err) => {
        if(err) return next(err);
        res.redirect(post.url);
    })
};

//get single post
exports.get_single_post = (req, res, next) => {
    Post.find({ _id: req.params.post_id }, (err, result) => {
        if(err) return next(err);
        res.json({
            post: result
        });
    });
};

//get all posts
exports.get_all_posts = (req, res, next) => {
    Post.find({}).sort({ time: -1 }).exec((err, results) => {
        if (err) return next(err);
        res.json({all_posts: results});
    })
};

//edit a post
exports.update_post = (req, res, next) => {

    const post = new Post({
        title: req.body.title,
        blogText: req.body.blogText,
        published: req.body.published,    
        _id: req.params.post_id   
    })

    //find by Id and update
    Post.findByIdAndUpdate({ _id: req.params.post_id }, post, (err, result) => {
        if (err) return next(err);
        res.json({
            updatedPost: result
        })
    });
};

//delete post
exports.delete_post = (req, res, next) => {
    //find by Id and delete
    Post.findByIdAndRemove({ _id: req.params.post_id }, (err, result) => {
        res.json({
            deletedPost: result
        })
    });
};