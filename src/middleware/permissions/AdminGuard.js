import {find} from 'lodash';

const Role = require('mongoose').model('Role');

const canReadAdminModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let role = req.user.role;
    let giveAccess = false;
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = find(selectedRole['permissions'], dt => {
        return dt.toString() === '5d1f6e7a51ae25227424df28';
    });
    if (findAccess) {
        giveAccess = true;
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

const canEditAdminModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let role = req.user.role;
    let giveAccess = false;
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = find(selectedRole['permissions'], dt => {
        return dt.toString() === '5d1f6eda51ae25227424df29';
    });
    if (findAccess) {
        giveAccess = true;
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

const canDeleteAdminModule = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let role = req.user.role;
    let giveAccess = false;
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = find(selectedRole['permissions'], dt => {
        return dt.toString() === '5d1f6ee451ae25227424df2a';
    });
    if (findAccess) {
        giveAccess = true;
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

module.exports = {
    canDeleteAdminModule,
    canEditAdminModule,
    canReadAdminModule,
};
