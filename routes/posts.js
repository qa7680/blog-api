const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

//All posts route
router.get('/', postController.get_all_posts);

//create post route
router.post('/', postController.create_blog_post);

//Single post route
router.get('/:post_id', postController.get_single_post);

//update post
router.put('/:post_id', postController.update_post);

//deleting post route
router.delete('/:post_id', postController.delete_post);

module.exports = router;