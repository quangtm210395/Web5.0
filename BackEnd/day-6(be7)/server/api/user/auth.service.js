const jwt = require('jsonwebtoken');
const config = require('../../configs');

module.exports = {
    authentication: function (req, res, next) {
        if (req.body || req.headers || req.query) {
            var token = req.body.token || req.query.token || req.headers['token'];
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        status: false,
                        msg: 'Please login first!'
                    });
                } else {
                    req.user = decoded.data;
                    next();
                }
            });
        } else res.status(401).json({
            status: false,
            msg: 'Please login first!'
        });
    },

    hasRole: function (requiredRole) {
        return function (req, res, next) {
            var roles = config.roles;
            var role = req.user.role;
            if (roles.indexOf(role) >= roles.indexOf(requiredRole)) 
                next();
            else {
                res.status(403).json({
                    status: false,
                    msg: 'Your role must be ' + requiredRole + ' or higher to do this!'
                });
            }
        };
    },

    hasPermission: function (api, requiredPermission) {
        return function (req, res, next) {
            var permissions = config.permissions;
            var userPermission = req.user.permission;
            userPermission.forEach((per, i) => {
                if (per[api]) {
                    if (permissions.indexOf(per[api]) >= permissions.indexOf(requiredPermission))
                        next();
                    else res.status(403).json({
                        status: false,
                        msg: 'Your do not have permission to do this!'
                    });
                }
            })
        }
    }
}