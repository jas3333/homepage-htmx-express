import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import connectDB from './utils/connectDB.js';
import errorHandler from './middleware/errorMiddleware.js';

// Routes
import navRouter from './router/navigationRouter.js';
import editorRouter from './router/editorRouter.js';
import authRouter from './router/authRouter.js';

// Setup
dotenv.config();
connectDB();
morgan.token('client-ip', (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress);

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));
app.use(express.static(path.resolve(__dirname, './public')));

app.use(navRouter);
app.use('/editor', editorRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

app.get('/notes/linux', (req, res) => {
    res.status(200).json({ content: '' });
    console.log(req);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
