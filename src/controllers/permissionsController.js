import {Permissions, Validate} from '../models/permissionsModel';
import {Role} from '../models/roleModel';
import {pick} from 'lodash';

/*
 * POST
 * Create new permissions
 * */
const createPermission = async (req, res) => {
    const body = req.body;

    // Validate the body
    const {error} = Validate(body);
    if (error) return res.status(400).sendError(error.details[0].message);

    // Create new instance on permission
    const MyPermission = new Permissions(pick(body, ['name', 'title', 'level', 'parentId']));

    try {
        // Save perm to db
        await MyPermission.save();

        // Insert new perm to core role
        const role = await Role.findOne({isCoreRole: true});
        if (role) {
            role.permissions.push(MyPermission._id);
            role.save();
        }
        return res.send(MyPermission);
    } catch (e) {
        return res.status(500).sendError(e);
    }
};

/*
* PUT
* Update permission
* */
const updatePermission = async (req, res) => {
    const {id} = req.body;
    if (!id) {
        return res.status(400).sendError('Please provide id');
    }

    try {
        const permission = await Permissions.findByIdAndUpdate(id,
            pick(req.body, ['name', 'title', 'level', 'parentId']), {new: true});
        return res.send(permission);
    } catch (e) {
        return res.status(400).sendError(e);
    }
};

/*
 * GET
 * Get all permissions
 * */
const getAllPermissions = async (req, res) => {
    try {
        // Fetch all permission
        const permissionData = await Permissions.find();
        return res.send(permissionData);
    } catch (e) {
        return res.status(500).sendError(e);
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    updatePermission
};
