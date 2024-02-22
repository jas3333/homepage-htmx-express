import express from 'express';
import {
    home,
    editor,
    getArticles,
    getArticle,
    getArticleCategory,
    login,
} from '../controllers/navigationController.js';

const router = express.Router();

router.route('/').get(home);
router.route('/editor').get(editor);
router.route('/getArticles').get(getArticles);
router.route('/category/:name').get(getArticleCategory);
router.route('/articles/:slug').get(getArticle);
router.route('/login').get(login);

export default router;
