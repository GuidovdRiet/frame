const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(postController.homePage));

// -- POSTS --
// -- Crud --
router.get('/posts/add', catchErrors(postController.addPost));
router.post('/posts/add', catchErrors(postController.createPost));
router.get('/post/:id/edit', catchErrors(postController.editPost));
router.post('/posts/add/:id', catchErrors(postController.updatePost));
router.get('/post/:id/delete', catchErrors(postController.deletePost));

module.exports = router;
