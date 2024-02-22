import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.user === process.env.username) {
            next();
        } else {
            res.status(401);
            throw new Error('Not authorized');
        }
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized');
    }
};

export default protect;
