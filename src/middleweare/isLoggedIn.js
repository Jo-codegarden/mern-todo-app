const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization; //const token
    if (!authHeader) { // if token is not provided
        res.status(401).send('invalid credentials');
    } else {
        const token = authHeader.split(" ")[1]; //get back the first index because there is two words
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send('invalid credentials');
            } else {
                next();
            }
        })
    }
}

