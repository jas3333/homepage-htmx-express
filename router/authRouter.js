import express from 'express';
import { login, checkAuth } from '../controllers/authController.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/checkauth').get(checkAuth);

export default router;
