import {AuthController, PermissionsController, RoleController, UserController} from '../controllers';
import Auth from '../middleware/permissions/Auth';
import {canDeleteAuth, canEditAuth, canReadAuth} from '../middleware/permissions/AuthGuard';

module.exports = app => {
    /* GET home page. */
    app.get('/', function (req, res, next) {
        res.send({title: `Welcome to ${process.env.PROJECT_NAME} REST API`});
    });

    /*
    * App Version Check
    * */
    app.get('/version', (req, res) => {
        res.send({version: '1.0.0'});
    });

    /*
     * Auth Routes
     * */
    app.post('/auth/register', AuthController.register);
    app.post('/auth/login', AuthController.login);
    app.get('/findUser/byToken', [Auth], AuthController.findUserByToken);

    /*
    * Permissions Routes
    * */
    app.post('/permissions/create', [Auth, canEditAuth], PermissionsController.createPermission);
    app.put('/permissions/edit', [Auth, canEditAuth], PermissionsController.updatePermission);
    app.get('/permissions', PermissionsController.getAllPermissions);

    /*
    * Roles Routes
    * */
    app.post('/roles/create', [Auth, canEditAuth], RoleController.createNewRole);
    app.put('/roles/update', [Auth, canEditAuth], RoleController.updateRole);
    app.get('/roles', RoleController.findAllRoles);
    app.delete('/roles/removeRole/:roleId', [Auth, canDeleteAuth], RoleController.removeRole);

    /*
    * User Routes
    * */
    app.post('/users/findAllUsers', [Auth, canReadAuth], UserController.findAllUsers);
    app.delete('/users/removeUser/:userId', [Auth, canDeleteAuth], UserController.removeUser);
};
