const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const passport = require('passport');

//All posts route
router.get('/',postController.get_all_posts);

//create post route
router.post('/', passport.authenticate('jwt', {session: false}),postController.create_blog_post);

//Single post route
router.get('/:post_id', postController.get_single_post);

//update post
router.put('/:post_id', passport.authenticate('jwt', {session: false}),postController.update_post);

//deleting post route
router.delete('/:post_id', passport.authenticate('jwt', {session: false}),postController.delete_post);

module.exports = router;