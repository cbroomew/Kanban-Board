import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    const key = process.env.JWT_SECRET || '';
    try {
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(403).send('Forbidden');
    }
};
