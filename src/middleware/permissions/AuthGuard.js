import {find} from 'lodash';
import {Role} from '../../models/roleModel';

const canReadAuth = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let role = req.user.role;
    let giveAccess = false;
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = find(selectedRole['permissions'], dt => {
        return dt.toString() === '5e29bb841806e135b4cd1db0';
    });
    if (findAccess) {
        giveAccess = true;
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

const canEditAuth = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let role = req.user.role;
    let giveAccess = false;
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = find(selectedRole['permissions'], dt => {
        return dt.toString() === '5e29bb9a1806e135b4cd1db1';
    });
    if (findAccess) {
        giveAccess = true;
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

const canDeleteAuth = async (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    let role = req.user.role;
    let giveAccess = false;
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = find(selectedRole['permissions'], dt => {
        return dt.toString() === '5e29bbac1806e135b4cd1db2';
    });
    if (findAccess) {
        giveAccess = true;
    }
    if (!giveAccess) return res.status(403).sendError('Access denied!');
    next();
};

module.exports = {
    canReadAuth,
    canDeleteAuth,
    canEditAuth,
};
