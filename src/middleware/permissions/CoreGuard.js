const _ = require('lodash');
const Role = require('mongoose').model('Role');

const canReadCoreModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let roles = req.user.roles ? req.user.roles : [];
    let giveAccess = false;
    for (const role of roles) {
        let selectedRole = await Role.findById(role).select('permissions');
        let findAccess = _.find(selectedRole['permissions'], dt => {
            return dt.toString() === '5db4190c37d2541e41e2bfcd';
        });
        if (findAccess) {
            giveAccess = true;
            break;
        }
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

const canEditCoreModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let roles = req.user.roles ? req.user.roles : [];
    let giveAccess = false;
    for (const role of roles) {
        let selectedRole = await Role.findById(role).select('permissions');
        let findAccess = _.find(selectedRole['permissions'], dt => {
            return dt.toString() === '5db419c137d2541e41e2bfce';
        });
        if (findAccess) {
            giveAccess = true;
            break;
        }
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

const canDeleteCoreModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let roles = req.user.roles ? req.user.roles : [];
    let giveAccess = false;
    for (const role of roles) {
        let selectedRole = await Role.findById(role).select('permissions');
        let findAccess = _.find(selectedRole['permissions'], dt => {
            return dt.toString() === '5db4189b4fe97d1dcbd33d5b';
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
    canDeleteCoreModule,
    canEditCoreModule,
    canReadCoreModule,
};
