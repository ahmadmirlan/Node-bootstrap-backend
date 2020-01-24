const AdminGuard = require('./AdminGuard');
const AuthGuard = require('./AuthGuard');
const Auth = require('./Auth');
const ContentGuard = require('./ContentGuard');
const CoreGuard = require('./CoreGuard');
const ManagementGuard = require('./ManagementGuard');

module.exports = {
    AdminGuard,
    ContentGuard,
    auth: Auth,
    ManagementGuard,
    AuthGuard,
    CoreGuard
};
