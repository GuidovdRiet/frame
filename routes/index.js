const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(postController.homePage));

// -- POSTS --
router.get('/posts/add', catchErrors(postController.addPost));
router.post('/posts/add', catchErrors(postController.createPost));

module.exports = router;
