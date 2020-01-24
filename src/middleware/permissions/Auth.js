import jwt from 'jsonwebtoken';

module.exports = function Auth(req, res, next) {
    let token = req.header('Authorization');

    if (!token)
        return res.status(401).sendError('Access denied. No token provided.');

    token = token.toString();

    if (token.includes('Bearer')) {
        token = token.split(' ')[1];
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        next();
    } catch (ex) {
        res.status(401).sendError(' Token Invalid or Expired.');
    }
};
