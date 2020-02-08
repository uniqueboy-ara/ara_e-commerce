module.exports = function EnsureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        let bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        next();
    } else
        res.sendStatus(403);
};