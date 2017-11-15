const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const userMiddleware = require('../middleware/userMiddleware');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(postController.homePage));

// -- POSTS --
// -- Crud --
router.get('/posts/add', catchErrors(postController.addPost));
router.post('/posts/add', catchErrors(postController.createPost));
router.get('/post/:id/edit', catchErrors(postController.editPost));
router.post('/posts/add/:id', catchErrors(postController.updatePost));
router.get('/post/:id/delete', catchErrors(postController.deletePost));

// -- USERS --
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/register', userController.registerForm);

// Validate data
// Register user
// Log in user
router.post(
    '/register',
    userController.upload,
    catchErrors(userController.resize),
    userMiddleware.validateRegister,
    catchErrors(userMiddleware.register),
    authController.login
);

module.exports = router;
