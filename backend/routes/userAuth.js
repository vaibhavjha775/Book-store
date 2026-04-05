const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    const authheaders = req.headers['authorization'];
    const token = authheaders && authheaders.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }
    jwt.verify(token, 'bookstore123', (err, decoded) => {
        if (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
}
        req.user = decoded;
        next();
    });
};
module.exports = {authenticate};