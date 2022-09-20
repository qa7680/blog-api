const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const passport = require('passport');

//get for single post route
router.get('/:post_id/comments', commentController.get_comments);

//post request creating a comment
router.post('/:post_id/comments', commentController.create_comment_post);

//get request for a single comment
router.get('/:post_id/comments/:comment_id', commentController.get_single_comment);

//update request for a comment
router.put('/:post_id/comments/:comment_id', passport.authenticate('jwt', {session: false}),commentController.update_comment);

//delete request for a comment
router.delete('/:post_id/comments/:comment_id', passport.authenticate('jwt', {session: false}),commentController.delete_comment)

module.exports = router;