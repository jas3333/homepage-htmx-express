import { generateToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    // const user = process.env.username;
    // const pass = process.env.password;
    const user = 'a';
    const pass = 'a';
    console.log(req.body);

    if (user === req.body.username && pass === req.body.password) {
        res.status(200).json({ token: generateToken(), url: '/editor' });
    } else {
        res.send('<script>window.location.replace("/login")</script>');
    }
};

const checkAuth = async (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.user === process.env.username) res.status(200).json({ url: '/editor' });
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};

export { login, checkAuth };
