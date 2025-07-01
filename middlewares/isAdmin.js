const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
}

module.exports = {
    isAdmin
}