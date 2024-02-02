import express from 'express';
import { getArticles, preview, save, load } from '../controllers/editorController.js';

const router = express.Router();
router.route('/preview').post(preview);
router.route('/save').post(save);
router.route('/getArticles').get(getArticles);
router.route('/load').post(load);

export default router;
