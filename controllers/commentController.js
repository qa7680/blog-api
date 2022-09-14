const Comment = require('../models/comments');

//create comment on single post
exports.create_comment_post = (req, res, next) => {
    //create new comment
    const comment = new Comment({
        comment: req.body.comment,
        username: req.body.username,
        postId: req.params.post_id,
    }).save((err) => {
        if (err) return next(err);
        res.send(`comment for ${req.params.post_id} saved`);
    });
};

//get all comments on single post
exports.get_comments = (req, res, next) => {
    Comment.find({ postId: req.params.post_id }).populate('postId').exec((err, results) => {
        if (err) return next(err);
        res.json({comments: results});
    });
};

//get single comment 
exports.get_single_comment = (req, res, next) => {
    Comment.find({ _id: req.params.comment_id }, (err, result) => {
        if(err) return next(err);
        res.json({
            comment: result
        });
    });
};

//update single comment
exports.update_comment = (req, res, next) => {
    const comment = new Comment({
        comment: req.body.comment,
        username: req.body.username,
        postId: req.params.post_id,
        _id: req.params.comment_id
    })

    Comment.findByIdAndUpdate( {_id: req.params.comment_id}, comment, (err, result) => {
        if (err) return next(err);
        res.json({
            updatedComment: result
        });
    });
};

//delete single comment
exports.delete_comment = (req, res, next) => {
    Comment.findByIdAndDelete({ _id: req.params.comment_id } , (err, result) => {
        res.json({
            deletedComment: result
        });
    });
};
