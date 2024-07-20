import express from 'express';
import path from 'path';
// import { TINY_KEY } from '../../config';

import {
    registerController, loginController, userController, refreshController, blogController
} from '../../controllers';
import { auth } from '../../middlewares';

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/whoami', auth, userController.whoami);
router.post('/refresh', refreshController.refresh);
router.post('/logout', auth, loginController.logout);
router.post('/createPost', auth, blogController.createBlog);
router.post('/updateBlog/:id', auth, blogController.updateBlog);
router.get('/:id', blogController.getBlog);

export default router;
