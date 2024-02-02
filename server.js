import express from 'express';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import connectDB from './utils/connectDB.js';

import navRouter from './router/navigationRouter.js';
import editorRouter from './router/editorRouter.js';

dotenv.config();
connectDB();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './public')));

app.use(navRouter);
app.use('/editor', editorRouter);

app.get('/notes/linux', (req, res) => {
    res.status(200).json({ content: '' });
    console.log(req);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
