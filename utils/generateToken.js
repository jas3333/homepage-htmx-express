import jwt from 'jsonwebtoken';

const generateToken = () => {
    return jwt.sign({ user: process.env.username }, process.env.JWT_SECRET, { expiresIn: '1m' });
};

export { generateToken };
