const _ = require('lodash');
const Role = require('mongoose').model('Role');

const canReadContentModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let roles = req.user.roles ? req.user.roles : [];
    let giveAccess = false;
    for (const role of roles) {
        let selectedRole = await Role.findById(role).select('permissions');
        let findAccess = _.find(selectedRole['permissions'], dt => {
            return dt.toString() === '5cf9d6403483454715e89ca2';
        });
        if (findAccess) {
            giveAccess = true;
            break;
        }
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

const canEditContentModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let roles = req.user.roles ? req.user.roles : [];
    let giveAccess = false;
    for (const role of roles) {
        let selectedRole = await Role.findById(role).select('permissions');
        let findAccess = _.find(selectedRole['permissions'], dt => {
            return dt.toString() === '5cf9d6463483454715e89ca3';
        });
        if (findAccess) {
            giveAccess = true;
            break;
        }
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

const canDeleteContentModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let roles = req.user.roles ? req.user.roles : [];
    let giveAccess = false;
    for (const role of roles) {
        let selectedRole = await Role.findById(role).select('permissions');
        let findAccess = _.find(selectedRole['permissions'], dt => {
            return dt.toString() === '5cf9d64f3483454715e89ca4';
        });
        if (findAccess) {
            giveAccess = true;
            break;
        }
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

module.exports = {
    canDeleteContentModule,
    canEditContentModule,
    canReadContentModule,
};
