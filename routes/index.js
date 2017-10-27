const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.homePage);

// -- POSTS --
router.get('/posts/add', postController.createPost);

module.exports = router;
