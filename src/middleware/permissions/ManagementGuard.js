const _ = require('lodash');
const Role = require('mongoose').model('Role');

const canReadManagement = async (req, res, next) => {
  // 401 Unauthorized
  // 403 Forbidden
  let roles = req.user.roles ? req.user.roles : [];
  let giveAccess = false;
  for (const role of roles) {
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = _.find(selectedRole['permissions'], dt => {
      return dt.toString() === '5db41a5437d2541e41e2bfd5';
    });
    if (findAccess) {
      giveAccess = true;
      break;
    }
  }
  if (!giveAccess) return res.status(403).sendError('Access denied!');
  next();
};

const canEditManagement = async (req, res, next) => {
  // 401 Unauthorized
  // 403 Forbidden
  let roles = req.user.roles ? req.user.roles : [];
  let giveAccess = false;
  for (const role of roles) {
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = _.find(selectedRole['permissions'], dt => {
      return dt.toString() === '5db41a1a37d2541e41e2bfd2';
    });
    if (findAccess) {
      giveAccess = true;
      break;
    }
  }
  if (!giveAccess) return res.status(403).sendError('Access denied!');
  next();
};

const canDeleteManagement = async (req, res, next) => {
  // 401 Unauthorized
  // 403 Forbidden
  let roles = req.user.roles ? req.user.roles : [];
  let giveAccess = false;
  for (const role of roles) {
    let selectedRole = await Role.findById(role).select('permissions');
    let findAccess = _.find(selectedRole['permissions'], dt => {
      return dt.toString() === '5db41a2337d2541e41e2bfd3';
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
  canDeleteManagement,
  canEditManagement,
  canReadManagement,
};
